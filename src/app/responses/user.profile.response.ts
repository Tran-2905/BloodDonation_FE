export interface UserProfile {
    fullName: string;
    email: string;
    bloodType: string;
    lastDonation: string | null;
    memberSince: string | null;
    phone: string;
    dob: string;
    address: string;
    conditions: string | null;
    medications: string | null;
}