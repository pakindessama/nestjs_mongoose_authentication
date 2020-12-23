/**
 * Setting decorator for public routes.
 * You can use @Public decorator to make a route public
 */
import { SetMetadata } from '@nestjs/common';
export const Public = () => SetMetadata('isPublic', true);
