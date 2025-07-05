import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Init } from "v8";
@Schema()
export class Profile {

    @Prop({require: true})
    useremail: string;

    @Prop({required: true})
    dob: string;

    @Prop({required: true})
    address: string;

    @Prop({required: true})
    pincode: string;

}

export const ProfileSchema = SchemaFactory.createForClass(Profile);