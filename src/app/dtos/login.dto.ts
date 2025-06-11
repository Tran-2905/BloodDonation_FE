export class loginDto {
    phone_number: string;
    password_hash: string;

    constructor(phone_number: string, password_hash: string) {
        this.phone_number = phone_number;
        this.password_hash = password_hash;
    }
}