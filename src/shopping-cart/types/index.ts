import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

class ShoppingCart {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 1 })
  partId: number;

  @ApiProperty({ example: faker.lorem.sentence(2) })
  boiler_manufacturer: string;

  @ApiProperty({ example: 12345 })
  price: string;

  @ApiProperty({ example: faker.lorem.sentence(2) })
  parts_manufacturer: string;

  @ApiProperty({ example: faker.lorem.word() })
  name: string;

  @ApiProperty({ example: faker.image.city() })
  image: string;

  @ApiProperty({ example: 5 })
  in_stock: number;

  @ApiProperty({ example: 12345 })
  total_price: number;

  @ApiProperty({ example: '2023-01-31T19:46:45.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2023-01-31T19:46:45.000Z' })
  updatedAt: string;
}

export class GetAllRequest {
  @ApiProperty({ example: 3 })
  userId: number;
}
export class GetAllResponse extends ShoppingCart {}

export class AddToCartResponse extends ShoppingCart {}

export class UpdateCountRequest {
  @ApiProperty({ example: 3 })
  count: number;
}

export class UpdateCountResponse {
  @ApiProperty({ example: 3 })
  count: number;
}

export class UpdateTotalPriceRequest {
  @ApiProperty({ example: 3000 })
  total_price: number;
}
export class UpdateTotalPriceResponse {
  @ApiProperty({ example: 30000 })
  total_price: number;
}
