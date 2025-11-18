import { Body, Controller, Post, Req } from '@nestjs/common';
import { PreLoginDTO } from './dto/pre-login.dto';
import { LoginDTO } from './dto/login.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/pre-login')
  async preLogin(@Body() userData: PreLoginDTO) {
    return await this.userService.preLogin(userData);
  }

  @Post('/login')
  async login(@Body() userData: LoginDTO, @Req() req: any) {
    let ipAddress = req?.headers['x-forwarded-for']
      ? req.headers['x-forwarded-for'].split(',')[0].trim()
      : req?.ip;
    return await this.userService.login(userData, ipAddress);
  }
}
