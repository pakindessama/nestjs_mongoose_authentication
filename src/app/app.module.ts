import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {HttpModule} from '@nestjs/common';
import { environment } from '../environments/environment';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [

    MongooseModule.forRoot(environment.mongodb.url, {authSource:'admin', useNewUrlParser: true, useCreateIndex: true, }),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    UsersModule,
    AuthModule,

  ],
  controllers: [],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ]
})
export class AppModule {

}

