import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  STUDENT = 'Student',
  ADMIN = 'Admin',
}

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  fullName: string;

  @Column({ length: 100 })
  firstLastName: string;

  @Column({ length: 100 })
  secondLastName: string;

  @Column({ length: 150, unique: true })
  email: string;

  @Column({ unique: true })
  phoneNumer: number;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 50 })
  documentType: string;

  @Column()
  documentNumber: number;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  role: UserRole;

  @CreateDateColumn()
  joinDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
