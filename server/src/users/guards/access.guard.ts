import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { TokensService } from '../../tokens/tokens.service';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    @Inject(TokensService) private readonly tokenService: TokensService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const headerToken = request.headers.authorization;
    const accessToken = headerToken?.split(' ')[1];

    if (!accessToken) {
      return false;
    }

    let usrData = this.tokenService.validateAccessToken(accessToken);
    if (usrData) return true;

    const refreshHeader = request.headers?.authorization_refresh as string;
    const token = refreshHeader?.split(' ')[1];

    usrData = await this.tokenService.validateByRefresh(token);
    if (!usrData) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
