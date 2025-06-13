import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class UserLogin {
    @Expose({ name: 'phone_number' })
    @IsNotEmpty({ message: 'Phone number can not be null' })
    phoneNumber: string;

    @Expose({ name: 'password_hash' })
    @IsNotEmpty({ message: 'Password can not be null' })
    password: string;

    constructor(phoneNumber: string, password: string) {
        this.phoneNumber = phoneNumber;
        this.password = password;
    }
}