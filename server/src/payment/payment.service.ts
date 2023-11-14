import { ForbiddenException, Injectable } from '@nestjs/common';
import { MakePaymentDto } from './dto/makePayment.dto';
import axios from 'axios';
import { CheckPaymentDto } from './dto/checkPayment.dto';

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
          'Idempotence-Key': Date.now(),
        },
        auth: {
          username: '221132',
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
          description: makePaymentDto.description,
        },
      });

      return data;
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  async checkPayment(checkPaymentDto: CheckPaymentDto) {
    try {
      console.log('checkPaymentDto.paymentId', checkPaymentDto.paymentId);

      const { data } = await axios({
        method: 'GET',
        url: `https://api.yookassa.ru/v3/payments/${checkPaymentDto.paymentId}`,
        auth: {
          username: '221132',
          password: 'test_6OeLlKAyXC_Eoue_nQhddV8hdljOrbtu5UQnjVUz3-k',
        },
      });

      return data;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
}
