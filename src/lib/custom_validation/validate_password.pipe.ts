import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import validator from "validator";

@Injectable()
export class cValidatePassword implements PipeTransform<any>{
    async transform(value: string){
        if(validator.isStrongPassword(value)){
            return value;
        } else{
            throw new BadRequestException("Minimal Password 8 karakter, gabungan angka, huruf kecil, huruf kapital dan spesial karakter $ & @ # ^ ( ) % !");
        }
    }
}