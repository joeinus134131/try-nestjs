import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class EncryptService {

    async bcrypt_hash(plaintext: string){
        const saltOrRounds = 10;
        return await bcrypt.hash(plaintext, saltOrRounds);
    }

    base64_encode(plaintext: string){
        return Buffer.from(plaintext).toString('base64');
    }

    md5(plaintext: string){
        return crypto.createHash('md5').update(plaintext).digest('hex');
    }

    aes256_enc(plaintext: string){
        const ENCRYPTION_KEY = process.env.SECRET_AES;

        let iv = process.env.AES_IV_LENGTH;
        let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
        let encrypted = cipher.update(plaintext);

        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return encrypted.toString('hex');
    }
}
