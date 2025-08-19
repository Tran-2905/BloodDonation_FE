export interface DonationResponse {
    donationId: number | null;
    donorUserId: number | null;
    recipientUserId: number | null;
    requestType: string | null;
    requestId: number | null;
    bloodType: string | null;
    component: string | null;
    unitsDonated: number | null;
    donationDate: string | null;
    status: string | null;
    progress: string | null;
    notes?: string | null;
}
