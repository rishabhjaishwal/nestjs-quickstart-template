import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { UserData } from '../entities/user.entity';

@EntityRepository(UserData)
export class UserRepository extends Repository<UserData> {
    
}