import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty } from 'class-validator';

export class UpdateAccountStatusDto {
  @ApiProperty({ example: 'Suspended', description: 'The new account status of the user' })
  @IsNotEmpty()
  @IsIn(['Suspended', 'Blocked'])
  accountStatus: string;
}
