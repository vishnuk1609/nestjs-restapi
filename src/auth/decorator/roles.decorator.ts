import { SetMetadata } from '@nestjs/common';
import { Roles } from '../enum/role.enum';

export const ROLES_KEY = 'role';
export const HasRole = (...role: Roles[]) => SetMetadata(ROLES_KEY, role);
