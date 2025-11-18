import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { constant } from 'src/config/constant/constant.config';
import { User, UserSchema } from './entity/user.entity';
import {
  LoginHistory,
  LoginHistorySchema,
} from './entity/login-history.entity';
import { PasswordTransformer } from 'src/transformer/has-string.transformer';
import { JwtStrategy } from 'src/strategy/user-local.strategy';
import { Web3Provider } from 'src/provider/web3.provider';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { LoginHistoryRepository } from './repository/login-history.repository';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: LoginHistory.name, schema: LoginHistorySchema },
    ]),
    JwtModule.register({
      global: true,
      secret: constant.JWT_CONFIG.USER_JWT_SECRET,
      signOptions: {
        expiresIn: constant.JWT_CONFIG
          .USER_JWT_EXPIRES_IN_HOURS as unknown as number,
      },
    }),
  ],
  controllers: [UserController],
  providers: [
    // services
    UserService,
    LoginHistoryRepository,
    UserRepository,

    PasswordTransformer,
    JwtStrategy,
    Web3Provider,
  ],
})
export class UserModule {}
