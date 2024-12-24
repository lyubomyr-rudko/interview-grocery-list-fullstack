import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { Request, Response } from 'express'
import { JwtAuthGuard } from 'src/authentication/auth.guard'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllUsers(@Req() request: Request, @Res() response: Response): Promise<any> {
    try {
      const users = await this.userService.getAllUsers()
      return response.status(200).json(users)
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }
}
