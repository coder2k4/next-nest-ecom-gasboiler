import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { SequelizeConfigService } from '../../src/config/sequelizeConfig.service';
import { databaseConfig } from '../../src/config/configuration';
import { UsersModule } from '../../src/users/users.module';
import { User } from '../../src/users/users.model';
import * as request from 'supertest';
import * as bcrypt from 'bcrypt';

describe('Users Controller', () => {
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
        UsersModule,
      ],
    }).compile();

    app = testModule.createNestApplication();
    await app.init();
  });

  // Удаление созданных пользователей
  afterEach(async () => {
    await User.destroy({ where: { username: 'testUsername' } });
  });

  // Проверка на создание пользователя
  it('should create user', async () => {
    const testUser = {
      username: 'testUsername',
      password: 'testPassword',
      email: 'test@email.user',
    };

    const response = await request(app.getHttpServer())
      .post('/users/signup')
      .send(testUser);

    const passwordIsValid = await bcrypt.compare(
      testUser.password,
      response.body.password,
    );

    expect(response.body.username).toBe(testUser.username);
    expect(response.body.email).toBe(testUser.email);
    expect(passwordIsValid).toBe(true);
  });
});
