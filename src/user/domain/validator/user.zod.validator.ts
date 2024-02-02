import IValidator from '@/shared/domain/validator/validator.interface';
import { z } from 'zod';
import { User } from '../entity/user.entity';

export class UserZodValidator implements IValidator<User> {
  validate(entity: User): void {
    const userSchema = z.object({
      firstName: z.string(),
      lastName: z.string(),
      password: z.string(),
    });

    try {
      const user = entity.toJSON();

      userSchema.parse({
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
      });
    } catch (error) {
      if (error instanceof Error) {
        entity.notification.addError({
          context: 'user',
          message: error.message,
        });
      }
    }
  }
}
