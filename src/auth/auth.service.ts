import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) { }
  async signIn(cpf: string, dataNascimento: string) {
    const user: User = await this.usersService.geByCpf(cpf);

    if (!user) {
      throw new UnauthorizedException('Cpf não encontrado');
    }

    if (user.dataNascimento !== dataNascimento) {
      throw new UnauthorizedException('Data de nascimento incorreta');
    }

    const payload = {
      id: user.id,
      nome: user.nome,
      cpf: user.cpf,
      data_nascimento: user.dataNascimento,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}