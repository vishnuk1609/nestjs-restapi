import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './category/category.module';
import { ProductsModule } from './products/products.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/dev'),
        AuthModule,
        UserModule,
        CategoryModule,
        ProductsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
