import express from 'express';
import { 
  createBudget, 
  getBudgets, 
  getBudgetById, 
  updateBudget, 
  deleteBudget,
  getDefaultBudget
} from '../controllers/budgets';
import { auth } from '../middleware/auth';

const router = express.Router();

// Protect all budget routes with auth middleware
router.use(auth);

// Get all budgets for the current user
router.get('/', getBudgets);

// Get user's default budget
router.get('/default', getDefaultBudget);

// Get a specific budget by ID
router.get('/:id', getBudgetById);

// Create a new budget
router.post('/', createBudget);

// Update an existing budget
router.put('/:id', updateBudget);

// Delete a budget
router.delete('/:id', deleteBudget);

export default router; 