# Pandora X

Recognition System

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You just need to install [docker](https://docs.docker.com/install/) & [docker-compose](https://docs.docker.com/compose/install/)

### Running

Just type this command on terminal and everything will be up and running

```bash
docker-compose up
```

## Debuging

Django shell
```bash
docker container exec -it pandora_app python3.6 manage.py shell
```

migrate database migration
```bash
docker container exec -it pandora_app python3.6 manage.py migrate
```

bash into app container
```bash
docker container exec -it pandora_app sh
```

## Built With

* [Django](https://www.djangoproject.com/) - The web framework used
* [uWSGI](https://uwsgi-docs.readthedocs.io/) - Used to deploy simple WSGI applications
* [nginx](https://www.nginx.com/) - Used as a web server
* [MySQL](https://www.mysql.com/) - Used for database
