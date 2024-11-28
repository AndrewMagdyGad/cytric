import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { z } from 'zod';
import { createUserSchema } from './utils';
import { S3AdapterFactory } from 'src/files/adapters/s3/s3.adapter.factory';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      createUserSchema.parse(createUserDto);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new BadRequestException(
          error.errors.map((e) => JSON.stringify(e)).join(', '),
        );
      }
      throw error; // Handle other unexpected errors
    }
    const newUser = new this.userModel(createUserDto);

    // check if user already exists by email
    const userExists = await this.findOneByEmail(newUser.email.toLowerCase());
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await this.hashPassword(newUser.password);
    newUser.password = hashedPassword;
    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  private async hashPassword(password: string) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }
}
