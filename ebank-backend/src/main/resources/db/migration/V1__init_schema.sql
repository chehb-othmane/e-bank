-- Migration Script for eBank Database
-- Date: 2025-01-01
-- Purpose: Add role field and update existing data

-- Step 1: Add role column to user table
ALTER TABLE user ADD COLUMN IF NOT EXISTS role VARCHAR(50) NOT NULL DEFAULT 'CLIENT';

-- Step 2: Update existing agent user
UPDATE user SET role = 'AGENT_GUICHET' WHERE username = 'agent1';

-- Step 3: Ensure all existing users have a role
UPDATE user SET role = 'CLIENT' WHERE role IS NULL OR role = '';

-- Step 4: Verify the changes
SELECT id, username, email, role FROM user;

-- Note: If you need to add more default agents, use:
-- INSERT INTO user (username, password, firstname, lastname, email, role, enabled, account_non_expired, account_non_locked, credentials_non_expired)
-- VALUES ('agent2', '$2a$10$...', 'Agent', 'Two', 'agent2@ebank.com', 'AGENT_GUICHET', true, true, true, true);