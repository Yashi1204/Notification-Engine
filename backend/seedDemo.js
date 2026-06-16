const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

async function seedDemoUsers() {
  await mongoose.connect(process.env.MONGO_URI);
  const hash = await bcrypt.hash('Demo@1234', 10);
  try {
    await User.create({ email: 'demo@notification.com', password: hash });
    console.log('Demo user created successfully');
    console.log('demo@notification.com / Demo@1234');
  } catch (e) {
    console.log('User already exists');
  }
  await mongoose.disconnect();
}

seedDemoUsers().catch(console.error);