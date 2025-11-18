import { IsNotEmpty } from 'class-validator';

export class PreLoginDTO {
  @IsNotEmpty()
  address: string;
}
