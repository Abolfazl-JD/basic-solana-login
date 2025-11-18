import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserStatus } from '../enum/user-status.enum';
import { generateReferralCode } from 'src/utils/generate-nounce.utils';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOneByAddress(address: string) {
    return this.userModel.findOne({ wallet_address: address });
  }

  async update(id: number, user: User) {
    return this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async createNewUser(address: string, nounce: any): Promise<User> {
    let newUser: User;
    try {
      newUser = await this.userModel.create({
        wallet_address: address,
        nounce: nounce,
        join_date: new Date().getTime(),
      });

      await newUser.save();
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async findOneByReferralCode(referralCode: string) {
    return this.userModel
      .findOne({ referral_code: referralCode, status: UserStatus.ACTIVE })
      .exec();
  }

  async findByUsername(username: string) {
    return this.userModel.findOne({ username: username }).exec();
  }

  async completeUserIntialField(
    userID: Types.ObjectId,
    tgUsername: string,
    email: any,
    username: string,
  ) {
    const updatedFields: Partial<User> = {
      telegram_username: tgUsername,
    };

    if (email) {
      updatedFields.email_address = email;
    }

    if (username) {
      updatedFields.username = username;
    }
    return this.userModel.findByIdAndUpdate(userID, updatedFields, {
      new: true,
    });
  }
  async findByIdWithParent(id: Types.ObjectId) {
    return this.userModel.findOne({ _id: id }).populate('parent').exec();
  }

  async updateUserNounce(id: Types.ObjectId, nounce: any) {
    return this.userModel.findByIdAndUpdate(
      id,
      { nounce: nounce },
      { new: true },
    );
  }

  async profile(id: Types.ObjectId): Promise<any> {
    const userProfile: any = await this.userModel.findById(id).lean();

    if (!userProfile) {
      return {};
    }

    return userProfile;
  }
}
