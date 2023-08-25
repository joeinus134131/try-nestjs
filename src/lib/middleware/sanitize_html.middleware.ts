import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from "express";
import * as sanitizeHtml from 'sanitize-html';

@Injectable()
export class SanitizeHtmlMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        // sanitize body
        
        if (req.body) {
            req.body = this.sanitizeObject(req.body);
        }
      
          // Sanitize query string
        if (req.query) {
            req.query = this.sanitizeObject(req.query);
        }
      
        next();
    }

    private sanitizeObject(obj: any): any {
        for (const key in obj) {
          if (typeof obj[key] === 'string') {
            obj[key] = sanitizeHtml(obj[key]);
          } else if (typeof obj[key] === 'object') {
            obj[key] = this.sanitizeObject(obj[key]);
          }
        }
        return obj;
    }
}