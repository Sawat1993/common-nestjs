import { Injectable } from '@nestjs/common';
var jwt = require('jsonwebtoken');

@Injectable()
export class TokenService {

    private key = 'SAWATANTRA';

    generateToken(body) {
        return jwt.sign(body, this.key);
    }

    verifyToken(token) {
        return jwt.verify(token, this.key);
    }

}
