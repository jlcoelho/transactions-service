import { ValueObject } from '@/shared/domain/value-object';

export enum TypeClient {
  COMMON = 'common',
  MERCHANT = 'merchant',
}

export type UserDocumentProps = {
  document: string;
  typeClient: TypeClient;
};

export class UserDocument extends ValueObject {
  private document: string;
  private typeClient: TypeClient;

  constructor(props: UserDocumentProps) {
    super();
    this.document = props.document;
    this.typeClient = props.typeClient;
  }
  get clientDocument() {
    return this.document;
  }

  get type() {
    return this.typeClient;
  }

  static create(props: UserDocumentProps) {
    return new UserDocument(props);
  }

  toJSON() {
    return {
      document: this.document,
      type: this.typeClient,
    };
  }
}
