import { Expose } from "class-transformer";
import { RhType } from "./enum";

export class BloodType {
    @Expose({ name: 'blood_type_id' })
    bloodTypeId: number = 0;

    @Expose({ name: 'type' })
    bloodTypeName: string = "";

    @Expose({ name: 'RhType' })
    RhType: RhType = RhType.Positive;

    @Expose({ name: 'description' })
    description: string = "";

    constructor(init?: Partial<BloodType>) {
        Object.assign(this, init);
    }



}