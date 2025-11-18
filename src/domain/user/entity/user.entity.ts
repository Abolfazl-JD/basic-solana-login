import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { UserStatus } from '../enum/user-status.enum';
import { BalanceTypeEnum } from '../enum/balance-type.enum';

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

  @Prop({ unique: true })
  wallet_address: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null })
  parent: User;

  @Prop({ default: 0 })
  current_ref_rank: number;

  @Prop({ default: 0 })
  experience_point: number;

  @Prop({ default: 0 })
  usdc_balance: number;

  @Prop({ default: 0 })
  total_stake: number;

  @Prop({ default: 0 })
  total_withdraw: number;

  @Prop({
    type: {
      msg: { type: Number, default: 0 },
      gas: { type: Number, default: 0 },
    },
    default: () => ({ msg: 0, gas: 0 }),
  })
  total_referral_reward: {
    msg: number;
    gas: number;
  };

  @Prop({
    type: Map,
    of: Number,
    default: () => ({
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
    }),
  })
  downline_count: Map<number, number>;

  @Prop({
    type: Object,
    default: () => {
      const initial: Record<string, Record<number, number>> = {};
      Object.values(BalanceTypeEnum).forEach((type) => {
        initial[type] = {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          6: 0,
          7: 0,
          8: 0,
          9: 0,
          10: 0,
        };
      });
      return initial;
    },
  })
  downline_rewards: Record<BalanceTypeEnum, Record<number, number>>;

  @Prop({
    type: Object,
    default: () => {
      const initial: Record<string, Record<number, number>> = {};
      Object.values(BalanceTypeEnum).forEach((type) => {
        initial[type] = {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          6: 0,
          7: 0,
          8: 0,
          9: 0,
          10: 0,
        };
      });
      return initial;
    },
  })
  downline_turnover: Record<BalanceTypeEnum, Record<number, number>>;

  @Prop({ default: 0 })
  join_date: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
