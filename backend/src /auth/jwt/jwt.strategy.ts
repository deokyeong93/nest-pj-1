import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret', // 절대 유출되면 안 되기에 나중에 환경 변수
      ignoreExpiration: false, // jwt 만료기간 줄 때
    });
  }

  // async validate(payload) {}
}
