import { Notification } from './notification/notification';
import { ValueObject } from './value-object';

export abstract class Entity {
  notification = new Notification();
  abstract get entityId(): ValueObject;
  abstract toJSON(): any;
}
