FROM python:3.6-alpine

# install mysqlclient on os
RUN apk add --update --no-cache --virtual .build-deps \
      build-base \
      mariadb-dev \
      python3-dev \
      libffi-dev \
      linux-headers \
    && apk add --no-cache \
      libuuid\
      libmagic\
      mariadb-connector-c \
      uwsgi\
      # Pillow dependencies
      jpeg-dev \
      zlib-dev \
      freetype-dev \
      lcms2-dev \
      openjpeg-dev \
      tiff-dev \
      tk-dev \
      tcl-dev \
      harfbuzz-dev \
      fribidi-dev

#create project directory and cd in it
RUN mkdir -p /data/project
WORKDIR /data/project

# install project requirements
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt && apk del .build-deps
