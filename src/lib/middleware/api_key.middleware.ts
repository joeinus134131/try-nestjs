import { Injectable, NestMiddleware } from "@nestjs/common";
import { ForbiddenException } from "@nestjs/common/exceptions";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction){
        let reqApiKey = req.headers['api_key'];
        if(reqApiKey == process.env.API_KEY){
            next();
        } else{
            throw new ForbiddenException()
        }
    }
}