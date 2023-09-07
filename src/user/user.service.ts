import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async create(data: User): Promise<User> {
    try {
      return await this.prisma.user.create({
        data,
      });
    }
    catch (error) {
      throw new Error(error.message);
    }
  }

  async delete(id: number): Promise<User> {
    try {
      return await this.prisma.user.delete({
        where: {
          id: id,
        },
      });
    }
    catch (error) {
      throw new Error(error.message);
    }
  }

  async update(id: number, data: User): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: {
          id: id,
        },
        data,
      });
    }
    catch (error) {
      throw new Error(error.message);
    }
  }

  async geByCpf(cpf: string): Promise<User> {
    try {
      return await this.prisma.user.findUnique({
        where: {
          cpf: cpf,
        },
      });
    }
    catch (error) {
      throw new Error(error.message);
    }
  }

}