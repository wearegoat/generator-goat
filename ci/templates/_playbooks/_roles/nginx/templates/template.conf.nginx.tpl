server {
    listen 80;

    root /var/www/{{ www_symlink }};
    index index.html index.htm;

    # Will also reply to "localhost" results
    server_name {{ domain }};

    gzip on;
    gzip_disable “MSIE [1-6]\.(?!.*SV1)”;
    gzip_comp_level 6;
    gzip_vary on;
    gzip_min_length  1000;
    gzip_proxied any;
    gzip_types text/plain text/css text/html application/json application/x-javascript text/xml application/xml application/xml+rss application/javascript text/javascript;
    gzip_buffers 16 8k;

    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    # If root URI
    location / {
        try_files $uri $uri/ /index.html;
    }
}
