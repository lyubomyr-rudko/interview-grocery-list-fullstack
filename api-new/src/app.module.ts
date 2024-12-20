import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { GroceryModule } from './grocery/grocery.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './authentication/auth.module';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
