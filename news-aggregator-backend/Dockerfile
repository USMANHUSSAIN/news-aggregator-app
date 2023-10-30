# Use the official PHP base image
FROM php:8.1

# Set working directory
WORKDIR /var/www/html

# Install dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath opcache

# Copy application files
COPY . .

# Copy .env file
COPY .env .env

# Install composer dependencies
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-interaction --no-scripts --no-progress

# Generate application key
RUN php artisan key:generate

# Expose port
EXPOSE 8000

# Start the PHP development server
CMD php artisan serve --host=0.0.0.0 --port=8000
