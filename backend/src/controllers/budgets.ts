import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all budgets for the current user
export const getBudgets = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    
    const budgets = await prisma.budget.findMany({
      where: {
        userId: userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return res.status(200).json({ 
      success: true, 
      data: budgets 
    });
  } catch (error) {
    console.error('Error fetching budgets:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error fetching budgets' 
    });
  }
};

// Get a specific budget by ID
export const getBudgetById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const budget = await prisma.budget.findFirst({
      where: {
        id: id,
        userId: userId
      }
    });
    
    if (!budget) {
      return res.status(404).json({ 
        success: false, 
        message: 'Budget not found' 
      });
    }
    
    return res.status(200).json({ 
      success: true, 
      data: budget 
    });
  } catch (error) {
    console.error('Error fetching budget:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error fetching budget' 
    });
  }
};

// Get the default budget for the current user
export const getDefaultBudget = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    
    const defaultBudget = await prisma.budget.findFirst({
      where: {
        userId: userId,
        isDefault: true
      }
    });
    
    if (!defaultBudget) {
      // If no default budget is found, return the most recently created budget
      const latestBudget = await prisma.budget.findFirst({
        where: {
          userId: userId
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
      
      if (!latestBudget) {
        return res.status(404).json({ 
          success: false, 
          message: 'No budgets found for user' 
        });
      }
      
      return res.status(200).json({ 
        success: true, 
        data: latestBudget 
      });
    }
    
    return res.status(200).json({ 
      success: true, 
      data: defaultBudget 
    });
  } catch (error) {
    console.error('Error fetching default budget:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error fetching default budget' 
    });
  }
};

// Create a new budget
export const createBudget = async (req: Request, res: Response) => {
  try {
    const { name, currency, isDefault } = req.body;
    const userId = req.user.id;
    
    // Validate required fields
    if (!name) {
      return res.status(400).json({ 
        success: false, 
        message: 'Budget name is required' 
      });
    }
    
    // If this budget is set as default, unset any existing default budget
    if (isDefault) {
      await prisma.budget.updateMany({
        where: {
          userId: userId,
          isDefault: true
        },
        data: {
          isDefault: false
        }
      });
    }
    
    // Create the new budget
    const newBudget = await prisma.budget.create({
      data: {
        name,
        currency: currency || 'USD',
        isDefault: isDefault || false,
        userId
      }
    });
    
    return res.status(201).json({ 
      success: true, 
      data: newBudget 
    });
  } catch (error) {
    console.error('Error creating budget:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error creating budget' 
    });
  }
};

// Update an existing budget
export const updateBudget = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, currency, isDefault } = req.body;
    const userId = req.user.id;
    
    // Verify the budget exists and belongs to the user
    const existingBudget = await prisma.budget.findFirst({
      where: {
        id: id,
        userId: userId
      }
    });
    
    if (!existingBudget) {
      return res.status(404).json({ 
        success: false, 
        message: 'Budget not found' 
      });
    }
    
    // If this budget is being set as default, unset any existing default budget
    if (isDefault) {
      await prisma.budget.updateMany({
        where: {
          userId: userId,
          isDefault: true,
          id: { not: id }
        },
        data: {
          isDefault: false
        }
      });
    }
    
    // Update the budget
    const updatedBudget = await prisma.budget.update({
      where: {
        id: id
      },
      data: {
        name: name !== undefined ? name : existingBudget.name,
        currency: currency !== undefined ? currency : existingBudget.currency,
        isDefault: isDefault !== undefined ? isDefault : existingBudget.isDefault
      }
    });
    
    return res.status(200).json({ 
      success: true, 
      data: updatedBudget 
    });
  } catch (error) {
    console.error('Error updating budget:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error updating budget' 
    });
  }
};

// Delete a budget
export const deleteBudget = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    // Verify the budget exists and belongs to the user
    const existingBudget = await prisma.budget.findFirst({
      where: {
        id: id,
        userId: userId
      }
    });
    
    if (!existingBudget) {
      return res.status(404).json({ 
        success: false, 
        message: 'Budget not found' 
      });
    }
    
    // Check if this is the user's only budget
    const budgetCount = await prisma.budget.count({
      where: {
        userId: userId
      }
    });
    
    if (budgetCount <= 1) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cannot delete the only budget. Create another budget first.' 
      });
    }
    
    // If this is the default budget, set another budget as default
    if (existingBudget.isDefault) {
      const anotherBudget = await prisma.budget.findFirst({
        where: {
          userId: userId,
          id: { not: id }
        }
      });
      
      if (anotherBudget) {
        await prisma.budget.update({
          where: {
            id: anotherBudget.id
          },
          data: {
            isDefault: true
          }
        });
      }
    }
    
    // Delete the budget
    await prisma.budget.delete({
      where: {
        id: id
      }
    });
    
    return res.status(200).json({ 
      success: true, 
      message: 'Budget deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting budget:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error deleting budget' 
    });
  }
}; 