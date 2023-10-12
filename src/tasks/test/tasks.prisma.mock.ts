import { Provider } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { tasks } from './tasks.mocks';

export const DatabaseMockProvider: Provider = {
  provide: DatabaseService,
  useValue: {
    task: {
      create: jest.fn().mockResolvedValue(tasks[0]),
      findMany: jest.fn().mockResolvedValue(tasks),
      findUnique: jest.fn().mockResolvedValue(tasks[0]),
      update: jest.fn().mockResolvedValue({ ...tasks[0], done: true }),
      delete: jest.fn().mockResolvedValue(tasks[0]),
      count: jest.fn().mockResolvedValue(tasks.length),
      // findUnique: jest.fn(),
      // add more mock functions as needed
    },
    // add more mock functions for other models as needed
  },
};
