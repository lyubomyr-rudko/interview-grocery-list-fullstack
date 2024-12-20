import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from 'src/user/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaservice: PrismaService,
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(loginDto: LoginUserDto): Promise<any> {
    const { username, password } = loginDto;
    const user = await this.prismaservice.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      token: this.jwtService.sign({ username: user.username }),
    };
  }

  async register(registerDto: RegisterUserDto): Promise<any> {
    const createdUser = new User();
    console.log('1~~>', registerDto);

    createdUser.name = registerDto.username;
    createdUser.email = registerDto.username;
    createdUser.username = registerDto.username;
    createdUser.password = bcrypt.hashSync(registerDto.password, 10);

    const user = await this.userService.createUser(createdUser);

    console.log('2~~>', user);

    return {
      token: this.jwtService.sign({ username: user.username }),
    };
  }
}
