import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { SequelizeConfigService } from '../../src/config/sequelizeConfig.service';
import { databaseConfig } from '../../src/config/configuration';
import { User } from '../../src/users/users.model';
import * as bcrypt from 'bcrypt';
import { AuthModule } from '../../src/auth/auth.module';
import { AuthService } from '../../src/auth/auth.service';

const mockedUser = {
  username: 'MockedUserName',
  password: 'MockedPassword',
  email: 'mocked@email.user',
};

describe('Auth Service', () => {
  let app: INestApplication;
  let authService: AuthService;

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
      ],
    }).compile();

    authService = testModule.get<AuthService>(AuthService);
    app = testModule.createNestApplication();
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

  // Проверка Login
  it('should login by AuthService', async () => {
    const user = await authService.validateUser(
      mockedUser.username,
      mockedUser.password,
    );

    expect(user.username).toBe(mockedUser.username);
    expect(user.email).toBe(mockedUser.email);
  });
});
