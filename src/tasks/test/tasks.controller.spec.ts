import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from '../tasks.controller';
import { TasksService } from '../tasks.service';
import { DatabaseModule } from '../../database/database.module';
import { tasks } from './tasks.mocks';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [TasksController],
      providers: [TasksService],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue({
        tasks,
        totalTasks: 4,
        totalPages: 1,
        currentPage: 1,
        perPage: 10,
      });

      const response = await controller.findAll({});

      expect(response).toStrictEqual({
        tasks,
        totalTasks: 4,
        totalPages: 1,
        currentPage: 1,
        perPage: 10,
      });
    });
  });

  describe('findOne', () => {
    it('should return a task', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(tasks[0]);

      expect(
        await controller.findOne({
          id: 'd9ad58c7-8b29-4777-8e8c-860f53401dc6',
        }),
      ).toStrictEqual(tasks[0]);
    });
  });

  describe('create', () => {
    it('should create a new task', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(tasks[0]);
      const body = {
        id: 'd9ad58c7-8b29-4777-8e8c-860f53401dc6',
        title: 'Test title',
        description: 'Test description',
        dueBy: '2023-09-28T01:44:43.236Z',
      };
      expect(await controller.create(body)).toStrictEqual(tasks[0]);
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const body = {
        done: true,
      };
      jest
        .spyOn(service, 'update')
        .mockResolvedValue({ ...tasks[0], done: true });

      expect(
        await controller.update(
          { id: '65990ff6-57bd-4242-94e6-ea6e9f8d9eed' },
          body,
        ),
      ).toStrictEqual({ ...tasks[0], done: true });
    });
  });

  describe('remove', () => {
    it('should remove a task', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(tasks[0]);

      expect(
        await controller.remove({ id: '65990ff6-57bd-4242-94e6-ea6e9f8d9eed' }),
      ).toStrictEqual(tasks[0]);
    });
  });
});
