import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import validator from "validator";

Injectable()
export class cMinLength implements PipeTransform<any>{
    constructor(
        private minValue: number
    ){}

    transform(value: any, metadata: ArgumentMetadata) {
        if(validator.isLength(value, {min: this.minValue})){
            return value;
        } else{
            throw new BadRequestException(`${metadata.data} minimal ${this.minValue} karakter`)
        }
    }
}