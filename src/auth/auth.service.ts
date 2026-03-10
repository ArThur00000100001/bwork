import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private userRepository: Repository<UserEntity>;
  constructor(
    private dataSource: DataSource,
    private jwtService: JwtService,
  ) {
    this.userRepository = dataSource.getRepository(UserEntity);
  }

  async validateCredentials(email: string, password: string) {
    const user = (await this.validateUser(email)) as UserEntity;
    if (!user) return null;
    const passworValid = await this.validatePassword(password, user.password);
    if (!passworValid) return null;
    return user;
  }

  async validateUser(email: string) {
    return await this.userRepository.findOne({
      where: { email: email },
    });
  }

  async validatePassword(password: string, passwordUser: string) {
    return await bcrypt.compare(password, passwordUser);
  }

  login(user: UserEntity) {
    const payload = {
      id: user.id,
      joinDate: user.joinDate,
      updateDate: user.updateDate,
      fullName: user.fullName,
      firstLastName: user.firstLastName,
      secondLastName: user.secondLastName,
      email: user.email,
      active: user.isActive,
      role: user.role,
    };
    return {
      token_access: this.jwtService.sign(payload),
    };
  }
}
