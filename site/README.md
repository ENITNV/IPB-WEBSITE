# IPB — Innovative Premium Bookkeeping Solutions website

Bilingual (English/Spanish) landing page plus a small contact service that emails consultation requests to Yael. No email address or phone number appears anywhere on the public site.

## Folder layout
- `index.html`, `css/`, `js/`, `assets/`: the public website
- `server/main.py`: FastAPI app that serves the website and handles `POST /api/contact`
- `Dockerfile`: builds one container with both (only the website files are public; `server/` and this README are not served)
- `.env.example`: the settings the contact service needs

## Deploying on IPB's Dokploy
1. Push this folder to a Git repo (or upload it) and create an **Application** in Dokploy using the **Dockerfile** build type.
2. Under **Environment**, add the variables from `.env.example`:
   - `CONTACT_TO`: Yael's email (where requests are delivered)
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURITY`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_FROM`: the mailbox that sends the notifications
3. Set the container port to **8000**, add the domain, and enable HTTPS.
4. Check `https://<domain>/healthz`. It should show `"mail_configured": true`. Then send a test through the form.

### SMTP examples
- **Google Workspace / Gmail:** `smtp.gmail.com`, port `587`, `starttls`, and an **app password** (requires 2-Step Verification on that account).
- **Hostinger email:** `smtp.hostinger.com`, port `465`, `ssl`.
- **Microsoft 365:** `smtp.office365.com`, port `587`, `starttls`. SMTP AUTH must be enabled for the sending mailbox.

`SMTP_FROM` should be an address on a domain that the SMTP account is allowed to send for, or the message may land in spam.

## How the form behaves
- Required fields: name, email, and "What do you need help with?" Business and phone are optional.
- Each email to Yael has Reply-To set to the visitor, so she can reply directly.
- Spam protection: a hidden honeypot field, a minimum fill time, and a limit of 5 submissions per 10 minutes per connection.
- The form shows success and error messages in whichever language the visitor has selected.

## Common edits
- **Any wording:** the `I18N` object in `js/main.js`. Every piece of text has an `en` and an `es` entry with the same key.
- **Form endpoint:** `SITE.formEndpoint` in `js/main.js` (default `/api/contact`). To use Formspree instead, paste its URL there.

## Language behavior
- The EN/ES toggle in the header switches instantly and remembers the choice.
- First visit: uses the browser language (Spanish browsers get Spanish).
- Shareable link: `/?lang=es` opens in Spanish.

## Running locally
```
pip install -r server/requirements.txt
mkdir -p public && cp -r index.html css js assets public/
CONTACT_TO=... SMTP_HOST=... SMTP_USER=... SMTP_PASSWORD=... uvicorn server.main:app --reload
```

## Open item
- "CBS" in the industries list: confirm with the client
