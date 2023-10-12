import { IsOptional, IsInt, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class TasksQueryDTO {
  @IsInt()
  @Transform((params) => parseInt(params.value))
  @IsOptional()
  @Min(1)
  page?: number;

  @IsInt()
  @Transform((params) => parseInt(params.value))
  @IsOptional()
  @Min(1)
  perPage?: number;
}
