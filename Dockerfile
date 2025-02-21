FROM php:8.4-apache

# Install required PHP extensions and dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    curl \
    git \
    libgmp-dev \
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
    libmagickwand-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp

RUN docker-php-ext-install -j$(nproc) \
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
    dba \
    ffi

# RUN docker-php-ext-install -j$(nproc) \
#     pdo_dblib \
#     pdo_firebird \
#     pdo_odbc \
#     pdo_sqlite \
#     snmp \
#     sqlite3 \
#     tidy

RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer globally
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Enable mod_rewrite for Apache
RUN a2enmod rewrite

# Set working directory
WORKDIR /var/www/html

# Expose Apache port
EXPOSE 80
