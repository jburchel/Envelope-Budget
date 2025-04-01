// This file contains setup code that will run before each test
import dotenv from 'dotenv';
import { afterAll } from '@jest/globals';

// Load environment variables from .env file
dotenv.config({ path: '.env.test' });

// Silence console output during tests
global.console = {
  ...console,
  // Uncomment these to disable specific console methods during tests
  // error: jest.fn(),
  // log: jest.fn(),
  // warn: jest.fn(),
  // info: jest.fn(),
} as Console;

// Clean up resources after all tests
afterAll(async () => {
  // Add any cleanup code here (e.g., close database connections)
}); 