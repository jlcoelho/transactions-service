import { UniqueEntityID } from '@/shared/domain/unique-entity-id';
import { User } from '../entity/user.entity';
import { IRepository } from '@/shared/domain/repository/repository.interface';

export interface IUserRepository extends IRepository<User, UniqueEntityID> {}
