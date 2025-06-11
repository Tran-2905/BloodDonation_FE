import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class UserLogin {
    @Expose({ name: 'phone_number' })
    @IsNotEmpty({ message: 'Phone number can not be null' })
    phone_number: string;

    @Expose({ name: 'password_hash' })
    @IsNotEmpty({ message: 'Password can not be null' })
    password_hash: string;

    constructor(phoneNumber: string, password: string) {
        this.phone_number = phoneNumber;
        this.password_hash = password;
    }
}