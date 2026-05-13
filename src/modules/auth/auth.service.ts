import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}

  async login(data: LoginDto) {
    const user = await this.usersRepository.findOne({
      where: { email: data.email },
      relations: ['category'],
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      category: user.category?.name,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        category: {
          name: user.category?.name,
        },
      },
    };
  }

  async register(data: RegisterDto) {
    const existingUser = await this.usersRepository.findOneBy({
      email: data.email,
    });

    if (existingUser) {
      throw new UnauthorizedException('O e-mail informado já está em uso.');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = this.usersRepository.create({
      email: data.email,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }
}
