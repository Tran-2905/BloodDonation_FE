import { Expose } from "class-transformer";
import { BloodComponent } from "./enum";

export class BloodComponents {
    @Expose({ name: 'component_id' })
    id: number = 1;

    @Expose({ name: 'component_name' })
    componentName: BloodComponent = BloodComponent.WHOLE_BLOOD;

    @Expose({ name: 'description' })
    description: String = "";

    constructor(init?: Partial<BloodComponents>) {
        Object.assign(this, init);
    }
}