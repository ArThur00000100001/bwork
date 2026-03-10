import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  fullName: string;

  @IsString()
  firstLastName: string;

  @IsString()
  secondLastName: string;

  @IsString()
  email: string;

  @IsNumber()
  phoneNumer: number;

  @IsString()
  password: string;

  @IsString()
  documentType: string;

  @IsNumber()
  documentNumber: number;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @IsString()
  role: UserRole;
}
