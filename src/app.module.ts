import { Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware';
import { ApiKeyMiddleware } from './lib/middleware/api_key.middleware';
import { SanitizeHtmlMiddleware } from './lib/middleware/sanitize_html.middleware';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer
      .apply(ApiKeyMiddleware)
      .forRoutes(
        { path: 'users/register', method: RequestMethod.POST },
        { path: 'auth/login', method: RequestMethod.POST },        
      );
    
    consumer
      .apply(SanitizeHtmlMiddleware)
      .forRoutes('*')
  }
}
