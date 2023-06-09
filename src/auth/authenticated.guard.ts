import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    /*
     * Т.к. сессии у нас через паспорт, доступен метод isAuthenticated
     * */
    return request.isAuthenticated();
  }
}
