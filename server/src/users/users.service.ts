import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from './entities/user.entity';
import { ALREADY_EXISTS, FORBIDDEN, NOT_FOUND } from './users.constants';
import * as bcrypt from 'bcrypt';
import { TokensService } from '../tokens/tokens.service';
import { IRegisterResult } from './users.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly tokenService: TokensService,
  ) {}

  private async findOne(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
    return user;
  }

  private async genTokens({ email }: SignUpDto) {
    const user = await this.findOne(email);
    const tokens = this.tokenService.generateTokens({ email });
    await this.tokenService.saveTokens(user.id, tokens.refreshToken);

    return {
      ...tokens,
      email: user.email,
    };
  }

  async register(dto: SignUpDto): Promise<IRegisterResult> {
    const candidate = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (candidate) {
      throw new HttpException(ALREADY_EXISTS, HttpStatus.CONFLICT);
    }
    const hashPassword = await bcrypt.hash(
      dto.password,
      +process.env.SALT || 3,
    );
    const user = this.userRepository.create({
      email: dto.email,
      password: hashPassword,
    });
    await this.userRepository.save(user);
    return await this.genTokens(dto);
  }

  async login({ email, password }: SignUpDto): Promise<IRegisterResult> {
    const user = await this.findOne(email);
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new HttpException(FORBIDDEN, HttpStatus.FORBIDDEN);
    }

    return await this.genTokens({ email, password });
  }

  async logout(refreshToken: string): Promise<void> {
    const token = await this.tokenService.removeToken(refreshToken);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
