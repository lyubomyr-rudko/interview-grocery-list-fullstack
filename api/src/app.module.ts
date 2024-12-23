import { Module } from '@nestjs/common';
import { GroceryModule } from './grocery/grocery.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './authentication/auth.module';

@Module({
  imports: [UserModule, AuthModule, GroceryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
