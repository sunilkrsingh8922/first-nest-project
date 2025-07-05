import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
export type LoginDocument = HydratedDocument<Login>;
@Schema({collection:'login'})
export class Login {
    
    @Prop({required :true})
    useremail:string;

    @Prop({required :true})
    password:string;
}
export const LoginSchema = SchemaFactory.createForClass(Login);