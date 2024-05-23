import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class CryptoService {
    async crypt(content: string) {
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(content, salt);
    }

    async isMatch(actual: string, expected: string) {
        return bcrypt.compare(actual, expected);
    }
}
