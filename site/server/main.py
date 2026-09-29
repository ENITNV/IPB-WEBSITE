"""
IPB website + contact form service.

Serves the static site and handles POST /api/contact by emailing the request
to the address in CONTACT_TO. That address and the SMTP login live only in
environment variables (set them in Dokploy), so nothing private is in the
website code visitors can see.

Environment variables (see .env.example):
  CONTACT_TO      where requests go (comma-separate for more than one)
  SMTP_HOST       e.g. smtp.gmail.com
  SMTP_PORT       587 for STARTTLS, 465 for SSL
  SMTP_SECURITY   starttls (default) | ssl | none
  SMTP_USER       SMTP login
  SMTP_PASSWORD   SMTP password / app password
  SMTP_FROM       sender address (defaults to SMTP_USER)
  SITE_DIR        folder with index.html (the Docker image sets this)
"""

from __future__ import annotations

import html
import logging
import os
import re
import smtplib
import ssl
import threading
import time
from collections import defaultdict, deque
from email.message import EmailMessage
from email.utils import formataddr, make_msgid
from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, ConfigDict

log = logging.getLogger("ipb")
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")

# ---------- settings ----------
CONTACT_TO = [a.strip() for a in os.getenv("CONTACT_TO", "").split(",") if a.strip()]
SMTP_HOST = os.getenv("SMTP_HOST", "")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_SECURITY = os.getenv("SMTP_SECURITY", "starttls").lower()
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
SMTP_FROM = os.getenv("SMTP_FROM", "") or SMTP_USER
SITE_DIR = Path(os.getenv("SITE_DIR", Path(__file__).resolve().parent.parent / "public"))

RATE_LIMIT = 5            # requests allowed ...
RATE_WINDOW = 10 * 60     # ... per IP in this many seconds
MIN_FILL_MS = 2500        # faster than this is almost certainly a bot

EMAIL_RE = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")
LIMITS = {"name": 100, "business": 150, "email": 254, "phone": 40, "message": 5000}

app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)


# ---------- helpers ----------
class ContactRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    name: str = ""
    business: str = ""
    email: str = ""
    phone: str = ""
    message: str = ""
    language: str = "English"
    website: str = ""        # honeypot
    elapsed_ms: int = 0


_hits: dict[str, deque] = defaultdict(deque)
_hits_lock = threading.Lock()


def rate_limited(ip: str) -> bool:
    now = time.monotonic()
    with _hits_lock:
        q = _hits[ip]
        while q and now - q[0] > RATE_WINDOW:
            q.popleft()
        if len(q) >= RATE_LIMIT:
            return True
        q.append(now)
        return False


def one_line(value: str, limit: int) -> str:
    """Trim, collapse line breaks (blocks header injection), and cap length."""
    return re.sub(r"[\r\n\t]+", " ", value).strip()[:limit]


def build_email(req: ContactRequest) -> EmailMessage:
    fields = [
        ("Name", req.name),
        ("Business", req.business or "—"),
        ("Email", req.email),
        ("Phone", req.phone or "—"),
        ("Language", req.language),
    ]
    subject = f"New consultation request: {req.name}"
    if req.business:
        subject += f" ({req.business})"

    text = "New free consultation request from the IPB website.\n\n"
    text += "\n".join(f"{k}: {v}" for k, v in fields)
    text += f"\n\nWhat they need help with:\n{req.message}\n\nReply to this email to answer them directly.\n"

    rows = "".join(
        f'<tr><td style="padding:6px 16px 6px 0;color:#64728a;white-space:nowrap">{k}</td>'
        f'<td style="padding:6px 0;color:#0f1b2d"><strong>{html.escape(v)}</strong></td></tr>'
        for k, v in fields
    )
    body_html = f"""\
<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;max-width:600px">
  <h2 style="color:#0b1f3a;margin:0 0 4px">New consultation request</h2>
  <p style="color:#64728a;margin:0 0 18px">Sent from the IPB website contact form.</p>
  <table style="border-collapse:collapse;margin-bottom:18px">{rows}</table>
  <p style="color:#64728a;margin:0 0 6px">What they need help with:</p>
  <div style="background:#f5f8fd;border-left:3px solid #248cff;padding:12px 16px;white-space:pre-wrap;color:#0f1b2d">{html.escape(req.message)}</div>
  <p style="color:#64728a;margin-top:18px">Reply to this email to answer {html.escape(req.name)} directly.</p>
</div>"""

    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = formataddr(("IPB Website", SMTP_FROM))
    msg["To"] = ", ".join(CONTACT_TO)
    msg["Reply-To"] = formataddr((req.name, req.email))
    msg["Message-ID"] = make_msgid(domain=SMTP_FROM.split("@")[-1] if "@" in SMTP_FROM else None)
    msg.set_content(text)
    msg.add_alternative(body_html, subtype="html")
    return msg


def send_email(msg: EmailMessage) -> None:
    ctx = ssl.create_default_context()
    if SMTP_SECURITY == "ssl":
        server = smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, timeout=20, context=ctx)
    else:
        server = smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=20)
    with server:
        if SMTP_SECURITY == "starttls":
            server.starttls(context=ctx)
        if SMTP_USER:
            server.login(SMTP_USER, SMTP_PASSWORD)
        server.send_message(msg)


# ---------- routes ----------
@app.get("/healthz")
def healthz():
    return {"ok": True, "mail_configured": bool(CONTACT_TO and SMTP_HOST and SMTP_FROM)}


@app.post("/api/contact")
def contact(req: ContactRequest, request: Request):
    ip = request.client.host if request.client else "unknown"

    # Bots: accept quietly so they don't learn to adapt, but send nothing.
    if req.website.strip() or req.elapsed_ms < MIN_FILL_MS:
        log.info("Dropped likely spam from %s", ip)
        return {"ok": True}

    if rate_limited(ip):
        return JSONResponse({"ok": False, "error": "rate_limited"}, status_code=429)

    req.name = one_line(req.name, LIMITS["name"])
    req.business = one_line(req.business, LIMITS["business"])
    req.email = one_line(req.email, LIMITS["email"])
    req.phone = one_line(req.phone, LIMITS["phone"])
    req.language = "Spanish" if req.language.lower().startswith("span") else "English"
    req.message = req.message.strip()[: LIMITS["message"]]

    if not req.name or not req.message or not EMAIL_RE.match(req.email):
        return JSONResponse({"ok": False, "error": "invalid"}, status_code=422)

    if not (CONTACT_TO and SMTP_HOST and SMTP_FROM):
        log.error("Contact form received a request but email settings are missing")
        return JSONResponse({"ok": False, "error": "not_configured"}, status_code=503)

    try:
        send_email(build_email(req))
    except Exception:  # noqa: BLE001 - log and tell the visitor to retry
        log.exception("Sending contact email failed")
        return JSONResponse({"ok": False, "error": "send_failed"}, status_code=502)

    log.info("Consultation request sent for %s", req.email)
    return {"ok": True}


@app.middleware("http")
async def security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers.setdefault("X-Content-Type-Options", "nosniff")
    response.headers.setdefault("Referrer-Policy", "strict-origin-when-cross-origin")
    response.headers.setdefault("X-Frame-Options", "SAMEORIGIN")
    return response


# Static site last, so /api and /healthz win.
app.mount("/", StaticFiles(directory=SITE_DIR, html=True), name="site")
