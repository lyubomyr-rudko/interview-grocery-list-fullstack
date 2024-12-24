import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GroceryModule } from './grocery/grocery.module'
import { UserModule } from './user/user.module'
import { AuthModule } from './authentication/auth.module'
import config from './config'

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env', `.env.${process.env.NODE_ENV}.local`, '.env.local'],
      isGlobal: true,
      load: [config],
    }),
    GroceryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
