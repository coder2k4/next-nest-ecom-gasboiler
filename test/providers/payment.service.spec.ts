import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { SequelizeConfigService } from '../../src/config/sequelizeConfig.service';
import { databaseConfig } from '../../src/config/configuration';
import { PaymentModule } from '../../src/payment/payment.module';
import { PaymentService } from '../../src/payment/payment.service';

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

describe('Payment Service', () => {
  let app: INestApplication;
  let paymentService: PaymentService;

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
        PaymentModule,
      ],
    }).compile();

    paymentService = testModule.get<PaymentService>(PaymentService);

    app = testModule.createNestApplication();

    await app.init();
  });

  // Проверка опралты
  it('should pay', async () => {
    const data = await paymentService.makePayment({
      amount: +mockedPay.amount.value,
    });

    expect(data).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        status: mockedPay.status,
        amount: mockedPay.amount,
        description: expect.any(String),
        recipient: {
          account_id: expect.any(String),
          gateway_id: expect.any(String),
        },
        created_at: expect.any(String),
        confirmation: {
          type: expect.any(String),
          confirmation_url: expect.any(String),
        },
        test: expect.any(Boolean),
        paid: expect.any(Boolean),
        refundable: expect.any(Boolean),
        metadata: expect.any(Object),
      }),
    );
  });
});
