import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, userModal } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: UserSchema.name, schema: userModal },
        ]),
        JwtModule.register({
            global: true,
            secret: '3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmF',
            signOptions: {
                expiresIn: '1hr',
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
