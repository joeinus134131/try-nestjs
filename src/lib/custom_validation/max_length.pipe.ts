import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import validator from "validator";

@Injectable()
export class cMaxLength implements PipeTransform<any>{
    constructor(
        private maxValue: number
    ){}

    transform(value: any, metadata: ArgumentMetadata) {
        if(validator.isLength(value, {max: this.maxValue})){
            return value;
        } else{
            throw new BadRequestException(`${metadata.data} maksimal ${this.maxValue} karakter`)
        }
    }
}