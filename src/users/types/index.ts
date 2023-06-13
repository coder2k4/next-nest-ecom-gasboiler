import { ApiProperty } from '@nestjs/swagger';

export class LoginUserRequest {
  @ApiProperty({ example: 'Vladimir' })
  username: string;
  @ApiProperty({ example: '123456' })
  password: string;
}

export class LoginUserResponse {
  /*
{
  "user": {
    "userId": 1,
    "username": "Alexey",
    "email": "coder2k@mail.ru"
  },
  "msg": "Logged in"
}
*/

  @ApiProperty({
    example: {
      userId: 1,
      username: 'Vladimir',
      email: 'putin@russia.gov',
    },
  })
  user: {
    userId: number;
    username: string;
    email: string;
  };

  @ApiProperty({ example: 'Logged in' })
  msg: string;
}

/*
 *  /login-check
 * */
export class LoginCheckRequest {}
export class LoginCheckResponse {
  /*{
  "userId": 1,
  "username": "Alexey",
  "email": "coder2k@mail.ru"
}*/
  @ApiProperty({ example: 1 })
  userId: number;
  @ApiProperty({ example: 'Vladimir' })
  username: string;
  @ApiProperty({ example: 'putin@russia.gov' })
  email: string;
}

export class LogoutRequest {}

export class LogoutResponse {
  // "msg": "session has ended"
  @ApiProperty({ example: 'session has ended' })
  msg: string;
}

export class SignupRequest {
  /*
{
  "username" : "Alexey2",
  "password" : "123456",
  "email" : "coder3k@mail.ru"
}
*/

  @ApiProperty({ example: 1 })
  userId: number;
  @ApiProperty({ example: 'Vladimir' })
  username: string;
  @ApiProperty({ example: 'putin@russia.gov' })
  email: string;
}

export class SignupResponse {
  /*

{
  "id": 2,
  "username": "Alexey2",
  "password": "$2b$10$Ji6gDXsbpkAhv.lq7F2rcuYCTFPeXE5ddD7TycLLwwtaN7IKm2jQC",
  "email": "coder3k@mail.ru",
  "updatedAt": "2023-06-13T05:27:30.157Z",
  "createdAt": "2023-06-13T05:27:30.157Z"
}

*/
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 'Vladimir' })
  username: string;
  @ApiProperty({ example: '$2b$10$Ji6gDXsbpkAhv.lq7F2rcuYCTFPeXE5ddD7TycL' })
  password: string;
  @ApiProperty({ example: 'putin@russia.gov' })
  email: string;
  @ApiProperty({ example: '2023-06-13T05:27:30.157Z' })
  updatedAt: string;
  @ApiProperty({ example: '2023-06-13T05:27:30.157Z' })
  createdAt: string;
}
