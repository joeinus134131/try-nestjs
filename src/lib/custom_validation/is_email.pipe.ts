import { Injectable, PipeTransform, BadRequestException } from "@nestjs/common";
import validator from "validator";

@Injectable()
export class cIsEmail implements PipeTransform{
    async transform(value: string) {
        if(validator.isEmail(value)){
            return value;
        } else{
            throw new BadRequestException("Gagal menyimpan data, silahkan coba kembali. Email tidak valid");
        }
    };
}