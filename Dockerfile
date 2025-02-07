# Use the official WordPress image as the base image
FROM wordpress:latest

# Update package lists
RUN apt-get update

# Install dependencies for PHP extensions
RUN apt-get install -y \
    libgmp-dev \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libwebp-dev \
    libxpm-dev \
    libvpx-dev \
    libzip-dev \
    libxml2-dev \
    zlib1g-dev \
    libicu-dev \
    g++ \
    libonig-dev \
    libcurl4-openssl-dev \
    libedit-dev \
    libssl-dev \
    libsqlite3-dev \
    libxslt1-dev \
    libpq-dev \
    libmagickwand-dev --no-install-recommends \
    && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install -j$(nproc) \
    gd \
    bcmath \
    bz2 \
    calendar \
    exif \
    gmp \
    gettext \
    intl \
    mysqli \
    opcache \
    pcntl \
    pdo_mysql \
    pdo_pgsql \
    pgsql \
    shmop \
    soap \
    sockets \
    sysvmsg \
    sysvsem \
    sysvshm \
    xsl \
    zip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Clean up to reduce the image size
RUN apt-get clean && rm -rf /var/lib/apt/lists/*
