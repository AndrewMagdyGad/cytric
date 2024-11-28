import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const userToAttempt = await this.usersService.findOneByEmail(email);
    if (!userToAttempt) {
      throw new UnauthorizedException();
    }
    // Check the supplied password against the hash stored for this user
    const isMatch = await bcrypt.compare(password, userToAttempt.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { email: userToAttempt.email, name: userToAttempt.name };
    return {
      token: this.jwtService.sign(payload),
      user: userToAttempt,
    };
  }
}
