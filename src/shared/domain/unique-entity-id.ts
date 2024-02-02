import { randomUUID } from 'node:crypto';
import { ValueObject } from './value-object';

export class UniqueEntityID extends ValueObject {
  readonly id: string;

  toString() {
    return this.id;
  }

  toValue() {
    return this.id;
  }

  constructor(value?: string) {
    super();
    this.id = value ?? randomUUID();
    this.validate();
  }

  private validate() {
    const regex = /^[a-z,0-9,-]{36,36}$/;
    if (!regex.test(this.id)) {
      throw new InvalidUuidError();
    }
  }
}

export class InvalidUuidError extends Error {
  constructor(message?: string) {
    super(message || 'ID must be a valida UUID');
    this.name = 'InvalidUuidError';
  }
}
