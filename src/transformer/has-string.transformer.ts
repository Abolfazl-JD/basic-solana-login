import { Injectable } from '@nestjs/common';
import * as Bcrypt from 'bcrypt';
import { Transform } from 'src/interface/transform.interface';

@Injectable()
export class PasswordTransformer implements Transform {
  transform(value: string): string {
    if (typeof value !== 'string') {
      throw new Error('Invalid input: expected a string');
    }
    return Bcrypt.hashSync(value, Bcrypt.genSaltSync(10));
  }
  reverseTransform(value: string): string {
    throw new Error('Reverse transformation not supported for hashing');
  }
}
