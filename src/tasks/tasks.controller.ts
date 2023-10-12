import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpCode,
  HttpException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksParamDTO } from './dto/tasks-param.dto';
import { TasksQueryDTO } from './dto/tasks-query.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTaskDto: CreateTaskDto) {
    try {
      return await this.tasksService.create(createTaskDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Get()
  async findAll(@Query() query: TasksQueryDTO) {
    try {
      return await this.tasksService.findAll(query);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param() params: TasksParamDTO) {
    try {
      const task = await this.tasksService.findOne(params.id);
      if (task === null) {
        throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
      }
      return task;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param() params: TasksParamDTO,
    @Body() updateTaskDto: Partial<UpdateTaskDto>,
  ) {
    try {
      return await this.tasksService.update(params.id, updateTaskDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Delete(':id')
  async remove(@Param() params: TasksParamDTO) {
    try {
      return await this.tasksService.remove(params.id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
