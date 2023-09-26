import { ForbiddenException, Injectable } from '@nestjs/common';
import { MakePaymentDto } from './dto/makePayment.dto';
import axios from 'axios';

@Injectable()
export class PaymentService {
  async makePayment(makePaymentDto: MakePaymentDto) {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { data } = await axios({
        method: 'POST',
        url: 'https://api.yookassa.ru/v3/payments',
        headers: {
          'Content-Type': 'application/json',
          'Idempotence-Key': new Date(),
        },
        auth: {
          username: 221132,
          password: 'test_6OeLlKAyXC_Eoue_nQhddV8hdljOrbtu5UQnjVUz3-k',
        },
        data: {
          amount: {
            value: makePaymentDto.amount,
            currency: 'RUB',
          },
          capture: true,
          confirmation: {
            type: 'redirect',
            return_url: 'http://localhost:3001/order',
          },
          description: 'Зайказ №1',
        },
      });

      return data;
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }
}
