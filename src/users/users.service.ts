import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { DataSource } from 'typeorm/browser';

@Injectable()
export class UsersService {
  private userRepository: Repository<UserEntity>;
  constructor(private dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(UserEntity);
  }

  async create(createUserDto: CreateUserDto) {
    const data = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (data) throw new BadRequestException('Usuario ya existente');

    const createUser = await this.userRepository.create(createUserDto);

    return this.userRepository.save(createUser);
  }

  async findAll() {
    const data = await this.userRepository.find();

    if (!data) throw new NotFoundException('Error al cargar usuarios');

    return data;
  }

  async findOne(id: number) {
    const data = this.userRepository.findOne({ where: { id } });
    return data;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const data = await this.findOne(id);
    await this.userRepository.update(id, updateUserDto);
    return data;
  }

  async remove(id: number) {
    const data = await this.findOne(id);
    await this.userRepository.delete(id);
    return data;
  }
}
