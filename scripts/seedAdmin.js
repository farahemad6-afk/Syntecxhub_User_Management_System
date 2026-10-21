require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../src/models/User');

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const email = (process.env.ADMIN_EMAIL || 'admin@example.com').toLowerCase();
  const exists = await User.findOne({ email });
  if (exists) {
    console.log('Admin already exists:', email);
  } else {
    await User.create({
      name: process.env.ADMIN_NAME || 'Admin',
      email,
      password: process.env.ADMIN_PASSWORD || 'Admin@12345',
      role: 'admin',
    });
    console.log('Admin created:', email);
  }
  await mongoose.disconnect();
})().catch((e) => { console.error(e); process.exit(1); });
