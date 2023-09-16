import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatedUsersDto{
  
  @ApiProperty()
  username: string;
  // username : mandatory
  @ApiProperty()
  @IsNotEmpty()
  email: string;

  // password : mandatory
  @ApiProperty()
  @IsNotEmpty()
  password: string;
  @ApiProperty()
  fullname: string;
  @ApiProperty()
  phone: string;
}