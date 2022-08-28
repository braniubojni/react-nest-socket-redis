import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpDto } from '../users/dto/sign-up.dto';
import * as jwt from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
import { Repository } from 'typeorm';
import { ITokens } from './tokens.interface';
import { NOT_FOUND } from './tokens.constant';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(Token) private readonly tokenModel: Repository<Token>,
  ) {}

  private genToken(
    payload: Pick<SignUpDto, 'email'>,
    tokenName: string | undefined,
    expiresIn: string,
  ): string {
    return jwt.sign(payload, tokenName || `secret-${Math.random()}`, {
      expiresIn,
    });
  }

  private async save(token: Token): Promise<Token> {
    return await this.tokenModel.save(token);
  }

  generateTokens(payload: Pick<SignUpDto, 'email'>): ITokens {
    const accessToken = this.genToken(
      payload,
      process.env.JWT_ACCESS_TOKEN,
      '30m',
    );

    const refreshToken = this.genToken(
      payload,
      process.env.JWT_ACCESS_TOKEN,
      '30d',
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveTokens(userId: number, refreshToken: string): Promise<Token> {
    const tokenData = await this.tokenModel.findOne({
      where: {
        user: {
          id: userId,
        },
      },
    });

    if (tokenData) {
      tokenData.refresh_token = refreshToken;
      return this.save(tokenData);
    }
    const token = this.tokenModel.create({
      user: {
        id: userId,
      },
      refresh_token: refreshToken,
    });

    return this.save(token);
  }

  async removeToken(refreshToken: string): Promise<void> {
    const token = await this.tokenModel.findOne({
      where: { refresh_token: refreshToken },
    });
    if (!token) {
      throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    await this.tokenModel.remove(token);
  }
}
