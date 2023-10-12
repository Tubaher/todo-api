import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from '../tasks.service';
import { DatabaseMockProvider } from './tasks.prisma.mock';
import { tasks } from './tasks.mocks';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseMockProvider, TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new task', async () => {
      const task = {
        title: 'Test title',
        description: 'Test description',
        dueBy: '2023-09-28T01:44:43.236Z',
      };
      expect(await service.create(task)).toStrictEqual(tasks[0]);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const result = {
        tasks: tasks,
        totalTasks: tasks.length,
        totalPages: 1,
      };
      expect(await service.findAll({})).toStrictEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a task', async () => {
      expect(
        await service.findOne('d9ad58c7-8b29-4777-8e8c-860f53401dc6'),
      ).toStrictEqual(tasks[0]);
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const task = {
        title: 'Test title',
        description: 'Test description',
        dueBy: '2023-09-28T01:44:43.236Z',
      };
      expect(
        await service.update('d9ad58c7-8b29-4777-8e8c-860f53401dc6', task),
      ).toStrictEqual(tasks[0]);
    });
  });

  describe('remove', () => {
    it('should remove a task', async () => {
      expect(
        await service.remove('d9ad58c7-8b29-4777-8e8c-860f53401dc6'),
      ).toStrictEqual(tasks[0]);
    });
  });
});
