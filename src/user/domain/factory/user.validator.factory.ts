import IValidator from '@/shared/domain/validator/validator.interface';
import { User } from '../entity/user.entity';
import { UserZodValidator } from '../validator/user.zod.validator';

export class UserValidatorFactory {
  static create(): IValidator<User> {
    return new UserZodValidator();
  }
}
