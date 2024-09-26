import { Gender } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';


export class PaginationDto {

    @IsOptional()
    @IsPositive()
    @Type( () => Number ) // enableImplicitConversions: true
    limit?: number;
    
    @IsOptional()
    @Min(0)
    @Type( () => Number ) // enableImplicitConversions: true
    page?: number;

    @IsOptional()
    @Type( () => String ) // enableImplicitConversions: true
    gender?: Gender;


}