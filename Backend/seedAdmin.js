const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const Admin = require("./models/Admin");

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seedAdmin = async () => {
  try {
    const hashedPassword = await bcrypt.hash(
      "admin123",
      10
    );

    await Admin.create({
      email: "admin@gangsterfashion.com",
      password: hashedPassword,
    });

    console.log("Admin Created");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

seedAdmin();