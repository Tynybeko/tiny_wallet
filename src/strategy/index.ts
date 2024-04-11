import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from '@nestjs/config'
import { IUserJWT, IJwtPayload } from "src/common/interfaces/auth";
import { Injectable } from "@nestjs/common";





@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('secret')
        })
    }


    async validate(payload: IJwtPayload): Promise<IUserJWT> {
        return {...payload.user}
    }


}