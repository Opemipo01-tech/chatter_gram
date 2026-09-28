import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import { prisma } from "../prisma_db/prisma.js"

export async function registerUser(req, res) {
  // Check validation errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed.",
      errors: errors.array(),
    });
  }

  const {
    username,
    email,
    password,
    firstName,
    lastName,
  } = req.body;

  try {
    // Check whether username already exists
    const existingUsername = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUsername) {
      return res.status(409).json({
        message: "Username is already taken.",
      });
    }

    // Check whether email already exists
    const existingEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingEmail) {
      return res.status(409).json({
        message: "Email is already registered.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        firstName,
        lastName,
      },
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        bio: true,
        avatarUrl: true,
        createdAt: true,
      },
    });

    return res.status(201).json({
      message: "Registration successful.",
      user,
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      message: "Something went wrong while creating your account.",
    });
  }
}