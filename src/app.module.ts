import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DefaultAdminModule } from 'nestjs-admin';
// import { TypeOrmModule } from 'typeorm';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [AuthModule, UsersModule, DefaultAdminModule, CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
