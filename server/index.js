const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const USERS_FILE = path.join(__dirname, 'users.json');

// Ensure users.json exists
async function initializeUsersFile() {
  try {
    await fs.access(USERS_FILE);
  } catch {
    await fs.writeFile(USERS_FILE, JSON.stringify([]));
  }
}

// Read users
app.get('/api/users', async (req, res) => {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Error reading users' });
  }
});

// Add users
app.post('/api/users', async (req, res) => {
  try {
    const { users } = req.body;
    const newUsers = users.map(user => ({
      id: Math.random().toString(36).substr(2, 9),
      name: user.trim(),
      lastGiftDate: null,
      createdAt: new Date().toISOString()
    }));

    const data = await fs.readFile(USERS_FILE, 'utf8');
    const existingUsers = JSON.parse(data);
    const updatedUsers = [...existingUsers, ...newUsers];
    
    await fs.writeFile(USERS_FILE, JSON.stringify(updatedUsers, null, 2));
    res.json(newUsers);
  } catch (error) {
    res.status(500).json({ error: 'Error adding users' });
  }
});

// Give gift
app.post('/api/users/:id/gift', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fs.readFile(USERS_FILE, 'utf8');
    const users = JSON.parse(data);
    
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    users[userIndex].lastGiftDate = new Date().toISOString();
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
    res.json(users[userIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Error giving gift' });
  }
});

// Remove gift
app.delete('/api/users/:id/gift', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fs.readFile(USERS_FILE, 'utf8');
    const users = JSON.parse(data);
    
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    users[userIndex].lastGiftDate = null;
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
    res.json(users[userIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Error removing gift' });
  }
});

// Delete user
app.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fs.readFile(USERS_FILE, 'utf8');
    const users = JSON.parse(data);
    
    const updatedUsers = users.filter(user => user.id !== id);
    await fs.writeFile(USERS_FILE, JSON.stringify(updatedUsers, null, 2));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
});

initializeUsersFile().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
  });
});