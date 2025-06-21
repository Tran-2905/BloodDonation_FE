import { Expose } from "class-transformer";
import { Gender, Status } from "./enum";

export class DonationRegistration {
    @Expose({ name: 'full_name' })
    fullName: string = '';
    @Expose({ name: 'phone_number' })
    phoneNumber: string = '';
    @Expose({ name: 'email' })
    email: string = '';
    @Expose({ name: 'date_of_birth' })
    dateOfBirth: Date | string = '';
    @Expose({ name: 'gender' })
    gender: Gender = Gender.Female;
    @Expose({ name: 'blood_type_id' })
    bloodTypeId: number = 0;
    @Expose({ name: 'weight' })
    weight: number | null = null;
    @Expose({ name: 'height' })
    height: number | null = null;
    @Expose({ name: 'last_donation' })
    lastDonation: Date | string | null = null;
    @Expose({ name: 'available_date' })
    availableDate: Date | string = '';
    @Expose({ name: 'available_time' })
    availableTime: string = '';
    @Expose({ name: 'notes' })
    notes: string = '';
    @Expose({ name: 'accept_general_term' })
    acceptGeneralTerm: boolean = false;
    @Expose({ name: 'accept_contact_term' })
    acceptContactTerm: boolean = false;


    constructor(init?: Partial<DonationRegistration>) {
        Object.assign(this, init);
    }

    isValid(): boolean {
        return (
            this.fullName.trim() !== '' &&
            this.phoneNumber.trim() !== '' &&
            this.email.trim() !== '' &&
            this.acceptGeneralTerm
        );
    }
}