import { Expose } from "class-transformer";

export class User {
    @Expose({ name: 'user_id' })
    id: number;
    @Expose({ name: 'full_name' })
    fullName!: string;
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
    @Expose({ name: 'created_at' })
    createdAt: Date;
    @Expose({ name: 'updated_at' })
    updatedAt: Date;
    @Expose({ name: "google_account_id" })
    googleAccountId: string;
    @Expose({ name: 'facebook_account_id' })
    facebookAccountId: string;
    @Expose({ name: 'blood_type' })
    bloodType: string;
    constructor(
        id: number,
        fullName: string,
        email: string,
        phoneNumber: string,
        password: string,
        role: string,
        country: string,
        city: string,
        address: string,
        createdAt: Date,
        updatedAt: Date,
        googleAccountId: string,
        facebookAccountId: string,
        bloodType: string
    ) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.role = role;
        this.country = country;
        this.city = city;
        this.address = address;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.googleAccountId = googleAccountId;
        this.facebookAccountId = facebookAccountId;
        this.bloodType = bloodType;
    }
}