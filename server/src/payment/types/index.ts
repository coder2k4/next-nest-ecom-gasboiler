import { ApiProperty } from '@nestjs/swagger';

export class MakePaymentResponse {
  /*
{
  "id": "2c1e18c5-000f-5000-8000-15a179cd464f",
  "status": "pending",
  "amount": {
    "value": "3000.00",
    "currency": "RUB"
  },
  "description": "Зайказ №1",
  "recipient": {
    "account_id": "221132",
    "gateway_id": "2093627"
  },
  "created_at": "2023-06-16T06:45:25.328Z",
  "confirmation": {
    "type": "redirect",
    "confirmation_url": "https://yoomoney.ru/checkout/payments/v2/contract?orderId=2c1e18c5-000f-5000-8000-15a179cd464f"
  },
  "test": true,
  "paid": false,
  "refundable": false,
  "metadata": {}
}
*/
  @ApiProperty({ example: '2c1e18c5-000f-5000-8000-15a179cd464f' })
  'id': string;

  @ApiProperty({ example: 'pending' })
  'status': string;

  @ApiProperty({
    example: {
      value: '3000.00',
      currency: 'RUB',
    },
  })
  'amount': {
    value: string;
    currency: string;
  };

  @ApiProperty({ example: 'Заказ №1' })
  'description': string;

  @ApiProperty({
    example: {
      account_id: '221132',
      gateway_id: '2093627',
    },
  })
  'recipient': {
    account_id: string;
    gateway_id: string;
  };

  @ApiProperty({ example: '2023-06-16T06:45:25.328Z' })
  'created_at': string;

  @ApiProperty({
    example: {
      type: 'redirect',
      confirmation_url:
        'https://yoomoney.ru/checkout/payments/v2/contract?orderId=2c1e18c5-000f-5000-8000-15a179cd464f',
    },
  })
  'confirmation': {
    type: string;
    confirmation_url: string;
  };

  @ApiProperty({ example: true })
  'test': boolean;

  @ApiProperty({ example: false })
  'paid': boolean;

  @ApiProperty({ example: false })
  'refundable': boolean;

  @ApiProperty({ example: {} })
  'metadata': object;
}
