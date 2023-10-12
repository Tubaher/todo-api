import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private readonly db: DatabaseService) {}

  private readonly logger = new Logger(TasksService.name);

  async create(createTaskDto: Prisma.taskCreateInput) {
    const { dueBy } = createTaskDto;
    const formattedDueBy = new Date(dueBy);
    const taskData = {
      ...createTaskDto,
      dueBy: formattedDueBy,
    };

    try {
      return await this.db.task.create({
        data: taskData,
      });
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        'The task already exists or it is violating a constraint',
      );
    }
  }

  async findAll({
    page = 1,
    perPage = 10,
  }: {
    page?: number;
    perPage?: number;
  }) {
    const skipCount = (page - 1) * perPage;

    try {
      const tasks = await this.db.task.findMany({
        skip: skipCount,
        take: perPage,
      });
      const totalTasks = await this.db.task.count();
      const totalPages = Math.ceil(totalTasks / perPage);

      return {
        tasks,
        totalTasks,
        totalPages,
        currentPage: page,
        perPage: perPage,
      };
    } catch (error) {
      this.logger.error(error);
      throw new Error('The tasks could not be retrieved');
    }
  }

  async findOne(id: string) {
    try {
      return await this.db.task.findUnique({
        where: { id },
      });
    } catch (error) {
      this.logger.error(error);
      throw new Error('Could not retrieve task information');
    }
  }

  async update(id: string, updateTaskDto: Prisma.taskUpdateInput) {
    try {
      return await this.db.task.update({
        where: { id },
        data: updateTaskDto,
      });
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        'The task to be updated does not exist or the data is invalid',
      );
    }
  }

  async remove(id: string) {
    try {
      return await this.db.task.delete({ where: { id } });
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        'The task could not be deleted. The task does not exist.',
      );
    }
  }
}
