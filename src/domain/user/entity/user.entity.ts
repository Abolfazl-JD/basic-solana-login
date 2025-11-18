import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserStatus } from '../enum/user-status.enum';

@Schema({ timestamps: true, collection: 'user' })
export class User extends Document {
  @Prop({ default: null })
  username: string;

  @Prop({ default: null })
  email_address: string;

  @Prop({ default: null })
  avatar: string;

  @Prop({ default: null })
  telegram_username: string;

  @Prop({ default: null })
  nounce: string;

  @Prop({ enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus;

  @Prop({ default: null })
  referral_code: string;

  @Prop({ required: true })
  wallet_address: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
