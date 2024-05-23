import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsBoolean,
  IsMobilePhone,
} from 'class-validator';

export class CreateAccountDto {
  @IsEmail()
  @IsNotEmpty()
  @Length(6, 30)
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 30)
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @Length(12, 100)
  address: string;

  @IsString()
  @IsNotEmpty()
  @IsMobilePhone('vi-VN')
  phone: string;

  @IsString()
  @IsNotEmpty()
  refreshToken: string;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
