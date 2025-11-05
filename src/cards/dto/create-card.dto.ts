import { IsNotEmpty, IsOptional, IsNumber, IsString } from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty() @IsString()
  name: string;

  @IsNotEmpty() @IsString()
  cardId: string;

  @IsNotEmpty() @IsString()
  seriesCode: string;

  @IsNotEmpty() @IsString()
  type: string;

  @IsNotEmpty() @IsString()
  subtype: string;

  @IsOptional() @IsNumber()
  atk?: number;

  @IsOptional() @IsNumber()
  def?: number;

  @IsOptional() @IsNumber()
  stars?: number;

  @IsNotEmpty() @IsString()
  description: string;

  @IsNotEmpty() @IsString()
  imageUrl: string;
}
