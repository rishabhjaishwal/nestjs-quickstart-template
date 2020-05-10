import { IsInt, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class ExampleDto {
    @ApiProperty()
    @IsString()
    name: string;
    
    @ApiPropertyOptional()
    @IsInt()
    @IsOptional()
    jobId: number;
}

