import request from 'supertest';
import express from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import budgetRoutes from '../routes/budgets';

// Mock PrismaClient
jest.mock('@prisma/client', () => {
  const mockPrisma = {
    budget: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
      delete: jest.fn(),
      count: jest.fn()
    },
    user: {
      findUnique: jest.fn()
    }
  };
  
  return {
    PrismaClient: jest.fn(() => mockPrisma)
  };
});

// Mock jsonwebtoken
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn()
}));

// Setup test app
const app = express();
app.use(express.json());
app.use('/api/budgets', budgetRoutes);

// Create prisma mock instance
const prisma = new PrismaClient();

describe('Budget API Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Setup auth middleware mock
    (jwt.verify as jest.Mock).mockReturnValue({ id: 'user-123' });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: 'user-123', email: 'test@example.com' });
  });

  describe('GET /api/budgets', () => {
    it('should return all budgets for a user', async () => {
      const mockBudgets = [
        { id: 'budget-1', name: 'Budget 1', userId: 'user-123' },
        { id: 'budget-2', name: 'Budget 2', userId: 'user-123' }
      ];
      
      (prisma.budget.findMany as jest.Mock).mockResolvedValue(mockBudgets);
      
      const res = await request(app)
        .get('/api/budgets')
        .set('Authorization', 'Bearer fake-token');
      
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toEqual(mockBudgets);
      expect(prisma.budget.findMany).toHaveBeenCalledWith({
        where: { userId: 'user-123' },
        orderBy: { createdAt: 'desc' }
      });
    });
  });
  
  describe('GET /api/budgets/default', () => {
    it('should return the default budget', async () => {
      const mockDefaultBudget = { 
        id: 'budget-1', 
        name: 'Default Budget', 
        userId: 'user-123',
        isDefault: true 
      };
      
      (prisma.budget.findFirst as jest.Mock).mockResolvedValue(mockDefaultBudget);
      
      const res = await request(app)
        .get('/api/budgets/default')
        .set('Authorization', 'Bearer fake-token');
      
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toEqual(mockDefaultBudget);
    });
    
    it('should return the most recent budget if no default exists', async () => {
      const mockLatestBudget = { 
        id: 'budget-2', 
        name: 'Latest Budget', 
        userId: 'user-123',
        isDefault: false 
      };
      
      // First findFirst returns null (no default budget)
      (prisma.budget.findFirst as jest.Mock)
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(mockLatestBudget);
      
      const res = await request(app)
        .get('/api/budgets/default')
        .set('Authorization', 'Bearer fake-token');
      
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toEqual(mockLatestBudget);
    });
  });
  
  describe('POST /api/budgets', () => {
    it('should create a new budget', async () => {
      const mockNewBudget = { 
        id: 'budget-3', 
        name: 'New Budget', 
        userId: 'user-123',
        currency: 'USD',
        isDefault: false 
      };
      
      (prisma.budget.create as jest.Mock).mockResolvedValue(mockNewBudget);
      
      const res = await request(app)
        .post('/api/budgets')
        .set('Authorization', 'Bearer fake-token')
        .send({ name: 'New Budget' });
      
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toEqual(mockNewBudget);
      expect(prisma.budget.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          name: 'New Budget',
          userId: 'user-123'
        })
      });
    });
    
    it('should return 400 if name is not provided', async () => {
      const res = await request(app)
        .post('/api/budgets')
        .set('Authorization', 'Bearer fake-token')
        .send({});
      
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(prisma.budget.create).not.toHaveBeenCalled();
    });
  });
  
  describe('DELETE /api/budgets/:id', () => {
    it('should not allow deleting the only budget', async () => {
      const mockBudget = { 
        id: 'budget-1', 
        name: 'Only Budget', 
        userId: 'user-123'
      };
      
      (prisma.budget.findFirst as jest.Mock).mockResolvedValue(mockBudget);
      (prisma.budget.count as jest.Mock).mockResolvedValue(1);
      
      const res = await request(app)
        .delete('/api/budgets/budget-1')
        .set('Authorization', 'Bearer fake-token');
      
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('Cannot delete the only budget');
      expect(prisma.budget.delete).not.toHaveBeenCalled();
    });
    
    it('should delete a budget and update default if needed', async () => {
      const mockBudget = { 
        id: 'budget-1', 
        name: 'Budget to Delete', 
        userId: 'user-123',
        isDefault: true
      };
      
      const mockOtherBudget = {
        id: 'budget-2',
        name: 'Other Budget',
        userId: 'user-123',
        isDefault: false
      };
      
      (prisma.budget.findFirst as jest.Mock)
        .mockResolvedValueOnce(mockBudget)
        .mockResolvedValueOnce(mockOtherBudget);
      (prisma.budget.count as jest.Mock).mockResolvedValue(2);
      
      const res = await request(app)
        .delete('/api/budgets/budget-1')
        .set('Authorization', 'Bearer fake-token');
      
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(prisma.budget.update).toHaveBeenCalledWith({
        where: { id: 'budget-2' },
        data: { isDefault: true }
      });
      expect(prisma.budget.delete).toHaveBeenCalledWith({
        where: { id: 'budget-1' }
      });
    });
  });
}); 