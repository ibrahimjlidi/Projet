import { SetMetadata } from "@nestjs/common";
export const ROLES_KEY = 'roles';
export const hasRoles = (...roles: string[]) => SetMetadata('roles', roles);
