import { Type } from 'class-transformer';
import { IsArray, IsIn, IsInt, IsNumber, IsOptional, 
    IsPositive, IsString, MinLength 
} from 'class-validator';


export class CreateAddressnextDto {

@IsString()
@MinLength(1)
userId: string;

@IsString()
@MinLength(1)
firstName: string;

@IsString()
@MinLength(1)
lastName: string;

@IsString()
@MinLength(1)
address: string;

@IsString()
@IsOptional()
@MinLength(1)
address2: string;

@IsString()
@MinLength(1)
postalCode: string;

@IsString()
@MinLength(1)
phone: string;

@IsString()
@MinLength(1)
city: string;

@IsString()
@MinLength(1)
country: string;


}

