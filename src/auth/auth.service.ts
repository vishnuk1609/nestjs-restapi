import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
    ConflictException,
} from '@nestjs/common';
import { LoginUser, RegisterUser } from './interface/auth.interface';
import { InjectModel } from '@nestjs/mongoose';
import { UserSchema, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    private readonly saltRounds = 10;

    constructor(
        @InjectModel(UserSchema.name) private userModel: Model<UserSchema>,
        private jwtService: JwtService,
    ) {}

    async signup(user: RegisterUser): Promise<void> {
        const { password, email } = user;
        const existingUser = await this.userModel.findOne({ email: email });
        if (existingUser) {
            throw new ConflictException(`User already exisit with ${email}`);
        }
        const hashedPassword = await bcrypt.hash(password, this.saltRounds);
        await this.userModel.create({
            ...user,
            password: hashedPassword,
        });
    }

    async signin(
        loginCredential: LoginUser,
    ): Promise<{ token: string; user: UserDocument }> {
        const { email, password } = loginCredential;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new NotFoundException(`No user found on ${email}`);
        }

        const isMatch: boolean = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new UnauthorizedException('password wrong');
        }

        const token = await this.jwtService.signAsync({
            userId: user._id,
            roles: user.role,
        });
        return { token, user };
    }

    async getAllUsers(): Promise<RegisterUser[]> {
        return await this.userModel.find().exec();
    }
}
