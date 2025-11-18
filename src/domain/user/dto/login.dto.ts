import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty()
  address: string;

  @IsString()
  sign: string;

  @IsOptional()
  @IsString()
  telegramUsername?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  referralCode?: string;
}
