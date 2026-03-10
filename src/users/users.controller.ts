import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const data = await this.usersService.create(createUserDto);
    return {
      data,
      message: 'ok',
      succsess: 'Faiulure',
    };
  }

  @Get()
  async findAll() {
    const data = await this.usersService.findAll();
    return {
      data,
      message: 'ok',
      succsess: 'Faiulure',
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.usersService.findOne(+id);
    return {
      data,
      message: 'ok',
      succsess: 'Faiulure',
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const data = await this.usersService.update(+id, updateUserDto);
    return {
      data,
      message: 'ok',
      succsess: 'Faiulure',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.usersService.remove(+id);
    return {
      data,
      message: 'ok',
      succsess: 'Faiulure',
    };
  }
}
