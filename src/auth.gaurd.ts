import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TokenService } from './shared/token/token.service';

@Injectable()
export class AuthGuard implements CanActivate {

    authFreeRoute = ['/users/login'];

    constructor(private tokenService: TokenService) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    validateRequest(request): boolean {
        try {
            if (this.authFreeRoute.includes(request.path)) return true;
            const tokenBody = this.tokenService.verifyToken(request.headers.authorization.split(' ')[1]);
            request.role = tokenBody.role;
            return true;
        } catch (e) {
            return false;
        }
    }
}