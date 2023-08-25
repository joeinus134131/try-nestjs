import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class DecryptService {

    async bcrypt_compare(plaintext: string, hash){
        return await bcrypt.compare(plaintext, hash);
    }

    base64_decode(chipertext: string){
        return Buffer.from(chipertext, 'base64').toString('ascii');
    }

    aes256_dec(chipertext: string){
        const ENCRYPTION_KEY = process.env.SECRET_AES;

        let iv = process.env.AES_IV_LENGTH;
        let encryptedText = Buffer.from(chipertext, 'hex');
        let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
        let decrypted = decipher.update(encryptedText);

        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
}
