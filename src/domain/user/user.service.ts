import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PreLoginDTO } from './dto/pre-login.dto';
import { generateRandomNounce } from 'src/utils/random.utils';
import { validateDestinationAddress } from 'src/helper/action.helper';
import { UserRepository } from './repository/user.repository';
import { LoginDTO } from './dto/login.dto';
import { Web3Provider } from 'src/provider/web3.provider';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly web3Provider: Web3Provider,
    private readonly jwtService: JwtService,
  ) {}

  async preLogin(userData: PreLoginDTO) {
    const nounce = generateRandomNounce(10);
    const isAddressValid = validateDestinationAddress(userData.address);
    if (!isAddressValid) throw new BadRequestException('invalid address');
    const user = await this.userRepository.findOneByAddress(userData.address);
    if (user) {
      user.nounce = nounce;
      await this.userRepository.update(user.id, user);
      return { nounce: nounce };
    } else {
      const userNew = await this.userRepository.createNewUser(
        userData.address,
        nounce,
      );
      return { nounce: userNew.nounce, isNew: true };
    }
  }

  async login(sign: LoginDTO, ip: string) {
    const user = await this.userRepository.findOneByAddress(sign.address);
    if (!user) {
      throw new NotFoundException("User doesn't exist");
    }
    const isAddressValid = validateDestinationAddress(user.wallet_address);
    if (!isAddressValid) {
      throw new BadRequestException('invalid address');
    }
    await this.web3Provider.verifySolanaSignIn(
      user.wallet_address,
      sign.sign,
      user.nounce,
    );

    const sanitizedUsername = sign.telegramUsername!.replace(/@/g, '');
    const trimmedUsername = sign.username?.trim();

    if (!trimmedUsername) {
      throw new BadRequestException('username not valid');
    }

    const usernameOwner =
      await this.userRepository.findByUsername(trimmedUsername);
    if (usernameOwner) {
      throw new BadRequestException('username already taken');
    }

    await this.userRepository.completeUserIntialField(
      user._id,
      sanitizedUsername,
      sign.email,
      trimmedUsername,
    );

    const nounce = generateRandomNounce(10);
    await this.userRepository.updateUserNounce(user.id, nounce);

    const accessToken = this.jwtService.sign({ id: user.id });

    const profile = await this.userRepository.profile(user!._id);
    return {
      data: profile,
      accessToken: accessToken,
    };
  }
}
