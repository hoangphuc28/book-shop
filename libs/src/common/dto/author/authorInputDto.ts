import { IsNotEmpty, IsNumber, Min } from 'class-validator'
import { Type } from 'class-transformer'

export class AuthorInputDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  isActive: string;
}
