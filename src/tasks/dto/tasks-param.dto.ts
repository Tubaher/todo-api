import { IsUUID } from 'class-validator';

export class TasksParamDTO {
  @IsUUID()
  id: string;
}
