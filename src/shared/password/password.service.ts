import { Injectable } from '@nestjs/common';
const bcrypt = require('bcrypt');

@Injectable()
export class PasswordService {
    
 async hash(val) {
     return await bcrypt.hash(val, 2);
 }

 async compare(raw, hash) {
    return await bcrypt.compare(raw, hash);
}

}
