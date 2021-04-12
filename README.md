# Subscription Service 

 Micro-service that take care of management of subscriptions.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

| Framework | Version  |
| ----------| -------- |
| Node      | 14.XX.XX |
| NPM       | 6.XX.XX  |

### Download and install dependencies

```shell
$ git clone https://github.com/yosamac/nerdsletter-subscription.git
$ cd nerdsletter-subscription
$ npm install
```

### Usage

```shell
npm start start:dev
```

## General configuration

### Environment variables

| Name                    | Description                                | Default                                      |
| ------------------------| ------------------------------------------ | ---------------------------------------------|
| MESH_HOST                | Mesh TCP host                             | `0.0.0.0`                                    |
| MESH_PORT                | Mesh TCP port                             | `4001`                                       |
| ENDPOINT_ROUTE          | Global URL prefix                          | NO DEFAULT VALUE                             |
| NODE_ENV                | Production or development mode             | `development`                                |
| LOGGING_LEVEL           | Logs level                                 | `INFO`                                       |
| **Mesh section of other services**                                                                                |||
| EMAIL_MESH_HOST         | EMAIL SERVICE TCP host                     | `0.0.0.0`                                    |
| EMAIL_MESH_PORT         | EMAIL SERVICE TCP port                     | `4002`                                       |
| **Database section**                                                                                              |||
| MONGODB_URI             | Connection database                        | `mongodb://localhost/nerdsletter_subscription`|


## Running the tests

### Unit tests

```shell
npm run test:unit
```

### Integration tests

```shell
npm run test
```

## Built With

* [NestJS](https://nestjs.com/) - The web framework used

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.org/yosama/nerdsletter-subscription/tags).


### Generate Release

```shell
npm run release
```

## Docker

### Generate development Docker image
```shell
npm run build:dev-image
```
### Generate production Docker image
```shell
npm run build:pro-image
```
### Docker compose
```shell
docker-compose up nerdsletter-subscription
```

### Docker hub repository
[Nerdsletter repository](https://hub.docker.com/repository/docker/yosama/nerdsletter-subscription)


## License

[ISC](https://choosealicense.com/licenses/isc/)
