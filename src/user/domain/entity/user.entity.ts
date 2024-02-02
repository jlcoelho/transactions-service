import { AggregateRoot } from '@/shared/domain/aggregate-root';
import { UniqueEntityID } from '@/shared/domain/unique-entity-id';
import { ValueObject } from '@/shared/domain/value-object';
import { UserDocument } from '../value-object/user-document';
import { Email } from '../value-object/user-email';
import { UserValidatorFactory } from '../factory/user.validator.factory';
import { NotificationError } from '@/shared/domain/notification/notification.error';

export type UserConstructorProps = {
  userId?: UniqueEntityID;
  firstName: string;
  lastName: string;
  document: UserDocument;
  email: Email;
  password: string;
  balance?: number;
  createdAt?: Date;
};

export type UserCreateCommand = {
  firstName: string;
  lastName: string;
  document: UserDocument;
  email: Email;
  password: string;
};

export class User extends AggregateRoot {
  private _userId: UniqueEntityID;
  private _firstName: string;
  private _lastName: string;
  private _document: UserDocument;
  private _email: Email;
  private _password: string;
  private _balance: number;
  private _createdAt: Date;

  constructor(props: UserConstructorProps) {
    super();
    this._userId = props.userId ?? new UniqueEntityID();
    this._firstName = props.firstName;
    this._lastName = props.lastName;
    this._document = props.document;
    this._email = props.email;
    this._password = props.password;
    this._balance = props.balance ?? 0;
    this._createdAt = props.createdAt ?? new Date();
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  static create(props: UserCreateCommand) {
    const user = new User(props);
    return user;
  }

  get entityId(): ValueObject {
    return this._userId;
  }

  validate() {
    UserValidatorFactory.create().validate(this);
  }

  toJSON() {
    return {
      user_id: this._userId.id,
      firstName: this._firstName,
      lastName: this._lastName,
      document: this._document.clientDocument,
      typeDocument: this._document.type,
      email: this._email.email,
      password: this._password,
      balance: this._balance,
      createdAt: this._createdAt,
    };
  }
}
