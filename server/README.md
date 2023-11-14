<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).


## Команды которые были использованы в разработке сервера:
```bash
$ npm i -g @nestjs/cli - глобальная установка nest cli
$ nest new server - инициализация проектиа nest cli

$ nest g mo users - создание модуля users
$ nest g co users - создание контроллера users
$ nest g s users - создание сервиса users

$ nest g mo auth 
$ nest g s auth 

$ nest g mo boiler-parts 
$ nest g co boiler-parts  
$ nest g s boiler-parts  

$ nest g mo shopping-cart
$ nest g co shopping-cart
$ nest g s shopping-cart

$ nest g mo payment
$ nest g co payment
$ nest g s payment

$ npx sequelize-cli init - Sequelize CLI
$ npx sequelize-cli model:generate --name BoilerPartsModel --attributes name:string  - создаеме модели и миграции
$ npx sequelize-cli db:migrate  - Запуск миграции
$ npx sequelize-cli seed:generate --name boiler-parts  - создание сида для заполнения
$ npx sequelize-cli db:seed:all  - заполняем таблицы
```

## Пакеты которые были использованы в разработке сервера:

```bash
$ yarn add sequelize sequelize-cli sequelize-typescript
$ yarn add @nestjs/sequelize
$ yarn add @nestjs/config
$ yarn add mysql2
$ yarn add class-validator
$ yarn add bcrypt
$ yarn add passport passport-local @nestjs/passport
$ yarn add express-session
$ yarn add @types/express-session
$ yarn add @types/passport
$ yarn add @nestjs/swagger
$ yarn add @faker-js/faker
$ yarn add axios

```


## Инфо по API

http://localhost:3000/swagger


## Тестовая карта Юкассы
https://yookassa.ru/developers/payment-acceptance/testing-and-going-live/testing

```5555555555554477	Mastercard```

