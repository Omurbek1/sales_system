/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  Max,
  Min,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  categoryId: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  cost: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(100)
  commissionPercent: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  stock: number;

  @IsArray()
  images: string[];

  @IsNotEmpty()
  @IsString()
  createdBy: string;
}

export class UpdateProductDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  categoryId: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  cost: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(100)
  commissionPercent: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  stock: number;

  //   @IsArray()
  //   images: string[];
}
