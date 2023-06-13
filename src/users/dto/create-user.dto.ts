import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Vladimir' })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ example: 'putin@russia.gov' })
  @IsNotEmpty()
  readonly email: string;
}
