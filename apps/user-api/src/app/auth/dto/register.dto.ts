import { IsNotEmpty, Length, IsMobilePhone, IsEmail } from 'class-validator'

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  @Length(6, 30)
  email: string

  @IsNotEmpty()
  @Length(6, 15)
  password: string

  @IsNotEmpty()
  @Length(6, 30)
  fullName: string

  @IsNotEmpty()
  @IsMobilePhone('vi-VN')
  phone: string

  @IsNotEmpty()
  @Length(12, 100)
  address: string
}
