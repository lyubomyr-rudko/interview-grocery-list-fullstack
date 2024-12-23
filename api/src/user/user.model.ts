import { Prisma } from '@prisma/client';

export class User implements Prisma.UserCreateInput {
  id?: string;
  username: string;
  password: string;
  email: string;
  name: string;
}
