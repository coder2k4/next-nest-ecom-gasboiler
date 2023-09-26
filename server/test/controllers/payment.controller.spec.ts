import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { SequelizeConfigService } from '../../src/config/sequelizeConfig.service';
import { databaseConfig } from '../../src/config/configuration';

import { User } from '../../src/users/users.model';
import * as request from 'supertest';
import * as bcrypt from 'bcrypt';
import { AuthModule } from '../../src/auth/auth.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { PaymentModule } from '../../src/payment/payment.module';

const mockedUser = {
  username: 'MockedUserName',
  password: 'MockedPassword',
  email: 'mocked@email.user',
};

const mockedPay = {
  status: 'pending',
  amount: {
    value: '100.00',
    currency: 'RUB',
  },
};

describe('Payment Controller', () => {
  let app: INestApplication;

  // Инициалищзируем nest приложение
  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRootAsync({
          imports: [ConfigModule],
          useClass: SequelizeConfigService,
        }),
        ConfigModule.forRoot({
          load: [databaseConfig],
        }),
        AuthModule,
        PaymentModule,
      ],
    }).compile();

    app = testModule.createNestApplication();
    app.use(
      session({
        secret: 'keyword',
        resave: false,
        saveUninitialized: false,
      }),
    );
    app.use(passport.initialize());
    app.use(passport.session());
    await app.init();
  });

  // создаем пользователя
  beforeEach(async () => {
    const user = new User();

    const hashedPassword = await bcrypt.hash(mockedUser.password, 10);

    user.username = mockedUser.username;
    user.password = hashedPassword;
    user.email = mockedUser.email;

    // сохраняем в базу данных нового пользователя
    return user.save();
  });

  // Удаление созданных пользователей
  afterEach(async () => {
    await User.destroy({ where: { username: mockedUser.username } });
  });

  // Проверка оплаты
  it('should pay', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const response = await request(app.getHttpServer())
      .post('/payment')
      .send({ amount: mockedPay.amount.value })
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body.status).toEqual(mockedPay.status);
    expect(response.body.amount).toEqual(mockedPay.amount);
  });
});
