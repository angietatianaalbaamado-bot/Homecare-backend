import { PickType } from '@nestjs/swagger';
import { CreatedUserDto } from './createUser.dto';

export class LoginUserDto extends PickType(CreatedUserDto, [
  'username',
  'password',
] as const) {}
