import { IsNotEmpty, IsNumber, Min } from 'class-validator'
import { Type } from 'class-transformer'

export class CategoryInputDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  isActive: string;

}
