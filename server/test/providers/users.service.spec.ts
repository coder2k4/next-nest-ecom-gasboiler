import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { SequelizeConfigService } from '../../src/config/sequelizeConfig.service';
import { databaseConfig } from '../../src/config/configuration';
import { UsersModule } from '../../src/users/users.module';
import { User } from '../../src/users/users.model';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../../src/users/users.service';

describe('Users Services', () => {
  let app: INestApplication;
  let usersService: UsersService;

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

    usersService = testModule.get<UsersService>(UsersService);
    app = testModule.createNestApplication();
    await app.init();
  });

  // Удаление созданных пользователей
  afterEach(async () => {
    await User.destroy({ where: { username: 'testUsername' } });
  });

  // Проверка на создание пользователя
  it('should create user by userService', async () => {
    const testUser = {
      username: 'testUsername',
      password: 'testPassword',
      email: 'test@email.user',
    };

    const user = (await usersService.create(testUser)) as User;

    const passwordIsValid = await bcrypt.compare(
      testUser.password,
      user.password,
    );

    expect(user.username).toBe(testUser.username);
    expect(user.email).toBe(testUser.email);
    expect(passwordIsValid).toBe(true);
  });
});
