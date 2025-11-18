import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.entity';

@Schema({ timestamps: true, collection: 'login_history' })
export class LoginHistory extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ default: null })
  platform: string;

  @Prop({ default: 0 })
  timestamp: number;

  @Prop({ default: null })
  ip: string;
}

export const LoginHistorySchema = SchemaFactory.createForClass(LoginHistory);
