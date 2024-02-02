import { ValueObject } from '@/shared/domain/value-object';
import validator from 'validator';

export class Email extends ValueObject {
  private _email: string;

  constructor(email: string) {
    super();
    this._email = email;
  }

  get email() {
    return this._email;
  }

  static create(email: string): Email {
    if (validator.isEmail(email)) {
      const _email = new Email(email);
      return _email;
    }
    throw new InvalidEmailError();
  }
}

export class InvalidEmailError extends Error {
  constructor(message?: string) {
    super(message || 'This is not a valid email.');
    this.name = 'InvalidEmailError';
  }
}
