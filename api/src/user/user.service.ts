import { ConflictException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { User } from './user.model'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany()
  }

  async findOne(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
    })
  }

  async createUser(user: User): Promise<User> {
    const existingUser = await this.findOne(user.username)

    if (existingUser) {
      throw new ConflictException('User already exists')
    }

    return this.prisma.user.create({
      data: user,
    })
  }
}
