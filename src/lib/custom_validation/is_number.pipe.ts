import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import validator from "validator";

@Injectable()
export class cIsNumber implements PipeTransform<any>{
    transform(value: any, metadata: ArgumentMetadata) {

        if(validator.isNumeric(value)){
            return value;
        } else{
            throw new BadRequestException(`${metadata.data} hanya berisi angka`)
        }
    };
}