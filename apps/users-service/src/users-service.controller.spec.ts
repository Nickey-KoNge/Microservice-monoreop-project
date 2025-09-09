import { Test, TestingModule } from '@nestjs/testing';
import { UsersServiceController } from './users-service.controller';
import { UsersServiceService } from './users-service.service';

describe('UsersServiceController', () => {
  let usersServiceController: UsersServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersServiceController],
      providers: [UsersServiceService],
    }).compile();

    usersServiceController = app.get<UsersServiceController>(
      UsersServiceController,
    );
  });

  describe('root', () => {
    // This is the new, correct test
    it('should return a user object', () => {
      const userId = '123';
      const result = usersServiceController.getUser({ userId });
      expect(result).toEqual({
        id: userId,
        name: 'John Doe',
        email: 'john.doe@example.com',
      });
    });
  });
});
