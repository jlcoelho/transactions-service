import { AggregateRoot } from '@/shared/domain/aggregate-root';
import { ValueObject } from '@/shared/domain/value-object';
import { User } from '../../user/domain/entity/user.entity';
import { UniqueEntityID } from '@/shared/domain/unique-entity-id';

export enum TransactionType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

export type TransactionConstructorProps = {
  transactionId?: UniqueEntityID;
  transactionType: TransactionType;
  amount: number;
  sender: User;
  receiver: User;
  createdAt?: Date;
};

export type TransactionCreateCommand = {
  transactionType: TransactionType;
  amount: number;
  sender: User;
  receiver: User;
};

export class Transaction extends AggregateRoot {
  private _transactionId: UniqueEntityID;
  private _transactionType: TransactionType;
  private _amount: number;
  private _sender: User;
  private _receiver: User;
  private _createdAt: Date;

  constructor(props: TransactionConstructorProps) {
    super();
    this._transactionId = props.transactionId ?? new UniqueEntityID();
    this._transactionType = props.transactionType;
    this._amount = props.amount;
    this._sender = props.sender;
    this._receiver = props.receiver;
    this._createdAt = props.createdAt ?? new Date();
  }

  static create(props: TransactionCreateCommand) {
    const transaction = new Transaction(props);
    return transaction;
  }

  get entityId(): ValueObject {
    return this._transactionId;
  }

  toJSON() {
    return {
      transactionId: this._transactionId.id,
      transactionType: this._transactionType,
      amount: this._amount,
      sender: this._sender.toJSON(),
      receiver: this._receiver.toJSON(),
      createdAt: this._createdAt,
    };
  }
}
