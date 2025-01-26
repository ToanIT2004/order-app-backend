
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/helper/util';
import { UsersService } from 'src/module/users/users.service';

@Injectable()
export class AuthService {
   constructor(
      private usersService: UsersService,
      private jwtService: JwtService,
      private configService: ConfigService
   ) { }

   async validateUser(username: string, pass: string): Promise<any> {
      const user = await this.usersService.findOneByUsername(username);
      if (!user) return null;
      const isValidPassword = await comparePassword(pass, user.password);
      if (!isValidPassword) return null;
      return user;
   }

   async login(user: any, response) {
      const payload = { _id: user._id, username: user.username };
      // Tạo ra refresh_token
      // Tạo Refresh Token
      const refreshToken = this.jwtService.sign(payload, {
         secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
         expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRE'), // Ví dụ: 7 ngày
      });

      // Thiết lập refresh_token trong cookie
      response.cookie('refresh_token', refreshToken, {
         httpOnly: true, // Chỉ truy cập từ backend, frontend không đọc được
         secure: true,   // Chỉ hoạt động trên HTTPS
         sameSite: 'strict', // Chống tấn công CSRF
         // maxAge: 7 * 24 * 60 * 60 * 1000, // Thời gian sống (7 ngày)
         maxAge: 300000, // Thời gian sống 5 phút
      });


      return {
         user: {
            username: user.username,
            _id: user._id,
         },
         access_token: this.jwtService.sign(payload),
      };
   }

   // Hàm làm mới access_token
   async refresh(request) {
      const refreshToken = request.cookies['refresh_token'];
      if (!refreshToken) {
         throw new UnauthorizedException('Refresh token không tồn tại');
      }

      try {
         // Giải mã token
         const payload = this.jwtService.verify(refreshToken, {
            secret: process.env.JWT_REFRESH_SECRET,
         });

         const username = payload.username;
         const _id = payload._id; // Lấy userId từ payload

         // Kiểm tra người dùng có tồn tại trong database không
         const user = await this.usersService.findOneByUsername(username);
         if (!user) {
            throw new UnauthorizedException('Người dùng không tồn tại');
         }

         // Tạo access_token mới
         const access_token = this.jwtService.sign({ _id: user._id, email: user.email }, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRED,
         });

         return { access_token };
      } catch (error) {
         throw new UnauthorizedException('Refresh token không hợp lệ');
      }
   }
}
