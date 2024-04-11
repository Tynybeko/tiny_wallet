import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { AuthService } from "src/modules/auth/auth.service";



@Injectable()
export class SessionSerialize extends PassportSerializer {
    constructor(
        private readonly authService: AuthService,
    ) {
        super()
    }

    serializeUser(user: any, done: Function) {
        done(null, user)

    }
    async deserializeUser(payload: any, done: Function) {
        if (!payload.email) return done(null, null)
        const user = await this.authService.validateUser(payload.email, process.env.PASSWORD_FOR_ACCOUNT_GOOGLE)
        if (!user) {
            return done(null, null)
        }
        const validation = this.authService.login(user)
        return validation ? done(null, validation) : done(null, null)
    }
}