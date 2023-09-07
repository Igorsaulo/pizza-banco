import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Body,
  Param,
  UseGuards,
  HttpException,
  HttpStatus,
  Dependencies
} from "@nestjs/common";

import { UserService } from './user.service';
import { User } from "@prisma/client";
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
@Dependencies(UserService)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user : User ) {
    try {
      return await this.userService.create(user);
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      return await this.userService.delete(id);
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() user : User) {
    try {
      return await this.userService.update(id, user);
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}