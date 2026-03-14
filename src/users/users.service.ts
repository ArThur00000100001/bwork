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
import { DataSource } from 'typeorm';

@Injectable()
export class UsersService {
  private userRepository: Repository<UserEntity>;
  constructor(private dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(UserEntity);
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const existUser = await queryRunner.manager.findOne(UserEntity, {
        where: { email: createUserDto.email },
      });
      if (existUser) throw new BadRequestException('Usuario existente.');
      const userCreate = queryRunner.manager.create(UserEntity, createUserDto);
      const userSave = await queryRunner.manager.save(userCreate);

      await queryRunner.commitTransaction();

      return userSave;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    const queryRunner = this.dataSource.createQueryRunner();
    (await queryRunner.connect(), await queryRunner.startTransaction());

    try {
      const data = await queryRunner.manager.find(UserEntity);
      if (!data) throw new NotFoundException('Error al cargar usuarios');

      await queryRunner.commitTransaction();
      return data;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async findOne(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const data = await queryRunner.manager.findOne(UserEntity, {
        where: { id },
      });
      if (!data) throw new NotFoundException('Error al encontrar ususario.');

      await queryRunner.commitTransaction();
      return data;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const data = await this.findOne(id);
      await queryRunner.manager.update(UserEntity, id, updateUserDto);

      await queryRunner.commitTransaction();
      return data;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const data = await this.findOne(id);
      await queryRunner.manager.delete(UserEntity, id);
      await queryRunner.commitTransaction();
      return data;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
    }
  }
}
