import { Expose } from "class-transformer";

export class registerDto {
    @Expose({ name: 'first_name' })
    firstName!: string;
    @Expose({ name: 'last_name' })
    lastName: string
    @Expose({ name: 'email' })
    email: string;
    @Expose({ name: 'phone_number' })
    phoneNumber: string;
    @Expose({ name: 'password_hash' })
    password: string;
    @Expose({ name: 'role' })
    role: string;
    @Expose({ name: 'country' })
    country: string;
    @Expose({ name: 'city' })
    city: string;
    @Expose({ name: 'address' })
    address: string;
    @Expose({ name: 'blood_type_id' })
    bloodTypeId: number;
    @Expose({ name: 'date_of_birth' })
    dateOfBirth: Date;

    constructor(
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string,
        password: string,
        role: string,
        country: string,
        city: string,
        address: string,
        bloodTypeId: number,
        dateOfBirth: Date
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.role = role;
        this.country = country;
        this.city = city;
        this.address = address;
        this.bloodTypeId = bloodTypeId;
        this.dateOfBirth = dateOfBirth;
    }
}