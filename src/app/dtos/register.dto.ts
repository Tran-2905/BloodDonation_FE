export class registerDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    birthDate: Date;

    constructor(
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        confirmPassword: string,
        phoneNumber: string,
        birthDate: Date
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.phoneNumber = phoneNumber;
        this.birthDate = birthDate;
    }
}