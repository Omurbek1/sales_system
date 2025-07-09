import { IsNotEmpty, IsString } from 'class-validator';

/* eslint-disable @typescript-eslint/no-unsafe-call */

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
