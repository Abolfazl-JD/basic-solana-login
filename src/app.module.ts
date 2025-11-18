import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { constant } from './config/constant/constant.config';
import { UserModule } from './domain/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(`${constant.DATABASE_CONFIG.MONGO_URL}`, {
      connectionFactory: (connection) => {
        console.log(
          `MongoDB connected to ${constant.DATABASE_CONFIG.DATABASE_NAME}`,
        );
        return connection;
      },
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
