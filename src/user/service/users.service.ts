import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async create(dto: CreateUserDto): Promise<User> {
        const existing = await this.usersRepository.findOne({ where: { email: dto.email } });
        if (existing) throw new BadRequestException('El email ya está registrado.');

        const hashed = await bcrypt.hash(dto.password, 10);

        const user = this.usersRepository.create({
            ...dto,
            password: hashed,
            role: dto.role ?? 'USER',
        });

        return this.usersRepository.save(user);
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (!user) {
            throw new Error(`User with email ${email} not found`);
        }
        return user;
    }


    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }
}
