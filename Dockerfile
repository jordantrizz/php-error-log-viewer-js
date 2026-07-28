# === PHP Error Log Viewer — Docker Image ===
#
# A minimal nginx:alpine image that serves the static application.
# No build step, no dependencies — just copy and serve.
#
# Usage:
#   docker build -t php-error-log-viewer .
#   docker run -d -p 8080:80 php-error-log-viewer
#
# Or with docker-compose (see docker-compose.yml.example):
#   docker compose up

FROM nginx:alpine

# Copy static assets into nginx document root
COPY index.html /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/

# Minimal nginx config: gzip for text assets, SPA-like fallback
RUN { \
      echo 'server {'; \
      echo '    listen 80 default_server;'; \
      echo '    root /usr/share/nginx/html;'; \
      echo '    index index.html;'; \
      echo '    server_name _;'; \
      echo '    gzip on;'; \
      echo '    gzip_types text/css application/javascript text/html text/plain;'; \
      echo '    location / {'; \
      echo '        try_files $uri $uri/ /index.html;'; \
      echo '    }'; \
      echo '}'; \
    } > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
