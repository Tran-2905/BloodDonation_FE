import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class UserLogin {
    @Expose({ name: 'email' })
    @IsNotEmpty({ message: 'Phone number can not be null' })
    email: string;

    @Expose({ name: 'password_hash' })
    @IsNotEmpty({ message: 'Password can not be null' })
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}