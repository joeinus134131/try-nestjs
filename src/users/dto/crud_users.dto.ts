import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatedUsersDto{
  
  // username : mandatory
  @ApiProperty()
  @IsNotEmpty()
  email: string;

  // password : mandatory
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}