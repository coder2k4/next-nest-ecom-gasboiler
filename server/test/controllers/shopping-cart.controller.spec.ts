import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { SequelizeConfigService } from '../../src/config/sequelizeConfig.service';

import { User } from '../../src/users/users.model';
import * as request from 'supertest';
import * as bcrypt from 'bcrypt';
import { AuthModule } from '../../src/auth/auth.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { BoilerPartsService } from '../../src/boiler-parts/boiler-parts.service';
import { UsersService } from '../../src/users/users.service';
import { ShoppingCartModule } from '../../src/shopping-cart/shopping-cart.module';
import { ShoppingCart } from '../../src/shopping-cart/shopping-cart.model';
import { databaseConfig } from '../../src/config/configuration';

const mockedUser = {
  username: 'MockedUserName',
  password: 'MockedPassword',
  email: 'mocked@email.user',
};

describe('Shopping Cart Controller', () => {
  let app: INestApplication;
  let boilerPartsService: BoilerPartsService;
  let userService: UsersService;

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
        ShoppingCartModule,
      ],
    }).compile();

    userService = testModule.get<UsersService>(UsersService);
    boilerPartsService = testModule.get<BoilerPartsService>(BoilerPartsService);

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

  // создаем тестовый вариант корзины
  beforeEach(async () => {
    const cart = new ShoppingCart();

    const user = await userService.findOne({
      where: {
        username: mockedUser.username,
      },
    });

    const part = await boilerPartsService.findOne(1);

    cart.userId = user.id;
    cart.partId = part.id;
    cart.boiler_manufacturer = part.boiler_manufacturer;
    cart.parts_manufacturer = part.parts_manufacturer;
    cart.price = part.price;
    cart.in_stock = part.in_stock;
    cart.image = JSON.parse(part.images)[0];
    cart.name = part.name;
    cart.total_price = part.price;

    return cart.save();
  });

  // Удаление созданных пользователей
  afterEach(async () => {
    await User.destroy({ where: { username: mockedUser.username } });
    await ShoppingCart.destroy({ where: { partId: 1 } });
  });

  // Получаем все элементы корзины
  it('should get all cart items', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const user = await userService.findOne({
      where: { username: mockedUser.username },
    });

    const response = await request(app.getHttpServer())
      .get(`/shopping-cart/${user.id}`)
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(Number),
          userId: user.id,
          partId: expect.any(Number),
          boiler_manufacturer: expect.any(String),
          price: expect.any(Number),
          parts_manufacturer: expect.any(String),
          name: expect.any(String),
          image: expect.any(String),
          count: expect.any(Number),
          total_price: expect.any(Number),
          in_stock: expect.any(Number),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      ]),
    );
  });

  // Добавляем элементы в корзину
  it('should add cart items', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const body = {
      username: mockedUser.username,
      partId: 3,
    };

    await request(app.getHttpServer())
      .post(`/shopping-cart/add`)
      .send(body)
      .set('Cookie', login.headers['set-cookie']);

    const user = await userService.findOne({
      where: { username: mockedUser.username },
    });

    const response = await request(app.getHttpServer())
      .get(`/shopping-cart/${user.id}`)
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body.find((element) => element.partId === 3)).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        userId: user.id,
        partId: 3,
        boiler_manufacturer: expect.any(String),
        price: expect.any(Number),
        parts_manufacturer: expect.any(String),
        name: expect.any(String),
        image: expect.any(String),
        count: expect.any(Number),
        total_price: expect.any(Number),
        in_stock: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    );
  });

  // Обновляем количество элеменитов в корзине
  it('should update count', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const body = {
      count: 10,
    };

    const response = await request(app.getHttpServer())
      .patch(`/shopping-cart/count/1`)
      .send(body)
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body).toEqual({ count: 10 });
  });

  // Обновляем общую цену элеменитов в корзине
  it('should update total price', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const body = {
      total_price: 6666,
    };

    const response = await request(app.getHttpServer())
      .patch(`/shopping-cart/total-price/1`)
      .send(body)
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body).toEqual({ total_price: 6666 });
  });

  // Удаляем по partId
  it('should delete by partId', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    await request(app.getHttpServer())
      .delete(`/shopping-cart/remove/1`)
      .set('Cookie', login.headers['set-cookie']);

    const user = await userService.findOne({
      where: { username: mockedUser.username },
    });

    const response = await request(app.getHttpServer())
      .get(`/shopping-cart/${user.id}`)
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body.find((element) => element.id === 1)).toBeUndefined();
  });

  // Удаляем все из корзины
  it('should delete all', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const user = await userService.findOne({
      where: { username: mockedUser.username },
    });

    await request(app.getHttpServer())
      .delete(`/shopping-cart/remove-all/${user.id}`)
      .set('Cookie', login.headers['set-cookie']);

    const response = await request(app.getHttpServer())
      .get(`/shopping-cart/${user.id}`)
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body).toStrictEqual([]);
  });
});
