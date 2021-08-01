import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthEntity } from './entity/auth.entity';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    // TODO use a library like bcrypt to hash and compare your passwords
    // https://github.com/kelektiv/node.bcrypt.js#readme
    const passwordValid = user.password === password;

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }

  async register(email: string, password: string): Promise<AuthEntity> {
    let user = await this.prisma.user.findUnique({ where: { email } });
    if (user) {
      throw new ConflictException();
    }

    user = await this.prisma.user.create({ data: { email, password } });
    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }
}
