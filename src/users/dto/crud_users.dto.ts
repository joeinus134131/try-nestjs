import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatedUsersDto{
  
  // users
  @ApiProperty()
  @IsNotEmpty()
  id_persons: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;


  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  fullname: string;

  @ApiProperty()
  phone: string;

  // persons
  @ApiProperty()
  bdate: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  photos: string;

  @ApiProperty()
  education: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  notes: string;

  @ApiProperty()
  is_deleted: number;

}