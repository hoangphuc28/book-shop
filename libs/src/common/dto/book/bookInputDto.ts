import { IsNotEmpty, IsNumber, Min } from 'class-validator'
import { Type } from 'class-transformer'

export class BookInputDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price: number;

  @IsNotEmpty()
  categoryId: string;

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  publishDate: Date;

  @IsNotEmpty()
  isActive: string;

}
