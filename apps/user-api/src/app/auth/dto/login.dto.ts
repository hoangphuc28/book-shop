import { PartialType } from '@nestjs/mapped-types';
import { RegisterDto } from './register.dto';


export class LoginDto {
    email: string;
    password: string;
}
