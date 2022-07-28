import { HttpException, Injectable } from '@nestjs/common';
import { CatsRepository } from 'src /cats/cats.repository';
import * as bcrypt from 'bcrypt';
import { LoginRequestDto } from './dto/login.request.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private jwtService: JwtService,
  ) {}

  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;

    // 해당하는 이메일이 있는지
    const cat = await this.catsRepository.findCatByEmail(email);

    if (!cat) {
      throw new HttpException('이메일과 비밀번호를 확인해주세요', 404);
    }

    //  패스워드가 일치하는지..
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      cat.password,
    );

    if (!isPasswordValidated) {
      throw new HttpException('이메일과 비밀번호를 확인해주세요', 404);
    }

    const payload = { email, sub: cat.id };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
