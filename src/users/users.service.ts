import { Injectable } from '@nestjs/common';

export type user = any;

@Injectable()
export class UsersService {
    private readonly users = [
        {
          userId: 1,
          username: 'madeagusandi446@gmail.com',
          password: '#Madeagusandi446',
        },
        {
          userId: 2,
          username: 'maria',
          password: 'guess',
        },
      ];
    
      async findOne(username: string): Promise<user | undefined> {
        return this.users.find(user => user.username === username);
      }    
}
