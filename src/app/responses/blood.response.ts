export interface BloodTypeResponse {
    bloodType: string;
    bloodTypeId: number;
}

export interface BloodCapacityResponse {
    type: String;
    canDonateTo: string[];
    canReceiveFrom: string[];
}

export interface BloodComponentResponse {
    id: number;
    componentName: string;
    description: string;
}