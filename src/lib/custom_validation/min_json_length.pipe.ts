import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";

@Injectable()
export class cMinJsonLength implements PipeTransform<any>{
    constructor(
        private minValue: number
    ){}

    transform(value: any, metadata: ArgumentMetadata) {
        if(value){
            if(value.length >= this.minValue){
                return value;
            } else{
                throw new BadRequestException(`${metadata.data} minimal berisi ${this.minValue} data`)
            }
        } else{
            throw new BadRequestException(`${metadata.data} minimal berisi ${this.minValue} data`)
        }
    }
}