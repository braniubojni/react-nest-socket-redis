import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { TokensService } from '../../tokens/tokens.service';

@Injectable()
export class GetUserGuard implements CanActivate {
  constructor(
    @Inject(TokensService) private readonly tokenService: TokensService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const headerToken = request.headers.authorization;
    const accessToken = headerToken?.split(' ')[1];
    if (!accessToken) {
      return false;
    }
    const usrData = this.tokenService.validateAccessToken(accessToken);
    if (!usrData) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
