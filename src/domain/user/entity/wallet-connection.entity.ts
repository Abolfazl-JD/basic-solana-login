import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'wallet_connection_history' })
export class WalletConnectionHistory extends Document {
  @Prop({ type: String, required: true })
  old_wallet_address: string;

  @Prop({ type: String, required: true })
  new_wallet_address: string;

  @Prop({ default: 0 })
  execute_time: number;
}

export const WalletConnectionHistorySchema = SchemaFactory.createForClass(
  WalletConnectionHistory,
);
