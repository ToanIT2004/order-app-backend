import { Controller, Request, Post, UseGuards, Res, Req } from '@nestjs/common';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { AuthService } from './auth.service';
import { Public } from 'src/decorator/customize';

@Controller('auth')
export class AuthController {
   constructor(private authService: AuthService) { }

   @Public()
   @UseGuards(LocalAuthGuard)
   @Post('login')
   async login(@Request() req, @Res({ passthrough: true }) response: Response) {
      return this.authService.login(req.user, response);
   }

   @Public()
   @Post('refresh')
   async refresh(@Req() request: Request) {
      // console.log("<<< request", request.);
      // console.log("<<< response: ", response);

      return this.authService.refresh(request);
   }
}
