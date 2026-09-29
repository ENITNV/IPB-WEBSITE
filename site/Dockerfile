# IPB website + contact form service
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    SITE_DIR=/app/public

WORKDIR /app

COPY server/requirements.txt server/requirements.txt
RUN pip install --no-cache-dir -r server/requirements.txt

COPY server/ server/
# Only the public website files go in public/ (server code and README stay private)
COPY index.html public/index.html
COPY css/ public/css/
COPY js/ public/js/
COPY assets/ public/assets/

RUN useradd --system --no-create-home app && chown -R app /app
USER app

EXPOSE 8000
CMD ["uvicorn", "server.main:app", "--host", "0.0.0.0", "--port", "8000", "--proxy-headers", "--forwarded-allow-ips", "*"]
