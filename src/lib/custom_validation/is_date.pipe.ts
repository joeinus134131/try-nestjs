import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import validator from "validator";

@Injectable()
export class cIsDate implements PipeTransform<any>{
    transform(value: any, metadata: ArgumentMetadata) {

        if(validator.isDate(value)){
            return value;
        } else{
            throw new BadRequestException(`${metadata.data} tidak valid`)
        }
    };
}