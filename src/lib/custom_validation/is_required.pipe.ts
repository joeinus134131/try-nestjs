import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import validator from "validator";

@Injectable()
export class cIsRequired implements PipeTransform<any>{
    transform(value: any, metadata: ArgumentMetadata) {

        if(typeof value === 'string'){
            if(!validator.isEmpty(value)){
                return value;
            } else{
                throw new BadRequestException(`${metadata.data} wajib diisi`)
            }
        } else if(typeof value === 'object'){
            if (!value || Object.keys(value).length === 0) {
                throw new BadRequestException(`${metadata.data} wajib diisi`);
            }
            for (const key in value) {
                if (!value[key]) {
                  throw new BadRequestException(`${key} ${metadata.data} wajib diisi`);
                }
            }
          
            return value;
        }
    };
}