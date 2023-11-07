import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './enum/role.enum';
import { ROLES_KEY } from './decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roleRequired = this.reflector.getAllAndOverride<Roles[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );
        if (!roleRequired) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        return roleRequired.some((role) => user.roles?.includes(role));
    }
}

