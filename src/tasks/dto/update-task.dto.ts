import { IsBoolean } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends CreateTaskDto {
  @IsBoolean()
  done: boolean;
}
