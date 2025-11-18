import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LoginHistory } from '../entity/login-history.entity';
import { Model } from 'mongoose';
import { User } from '../entity/user.entity';

@Injectable()
export class LoginHistoryRepository {
  constructor(
    @InjectModel(LoginHistory.name)
    private loginHistoryModel: Model<LoginHistory>,
  ) {}

  async createLoginLog(platform: string, user: User): Promise<LoginHistory> {
    try {
      let newLog = new this.loginHistoryModel({
        user: user._id,
        platform: platform,
        // ip: ip,
        timestamp: new Date().getTime(),
      });
      await newLog.save();
      return newLog;
    } catch (error) {
      // If there's an error after the user has been created, handle it here
      throw error; // Re-throw the error after handling it
    }
  }

  async createLoginLog2(user: User, ip: string = ''): Promise<LoginHistory> {
    try {
      let newLog = new this.loginHistoryModel({
        user: user._id,
        ip: ip || null,
        timestamp: new Date().getTime(),
      });
      await newLog.save();
      return newLog;
    } catch (error) {
      // If there's an error after the user has been created, handle it here
      throw error; // Re-throw the error after handling it
    }
  }
}
