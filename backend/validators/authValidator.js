import { body } from "express-validator";

export const registerValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required.")
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters.")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage(
      "Username can only contain letters, numbers, and underscores."
    ),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please provide a valid email address.")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 8, max: 72 })
    .withMessage("Password must be between 8 and 72 characters long."),

  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required.")
    .isLength({ min: 2, max: 50 })
    .withMessage("First name must be between 2 and 50 characters.")
    .matches(/^[a-zA-ZÀ-ÖØ-öø-ÿ]+(?:[-' ][a-zA-ZÀ-ÖØ-öø-ÿ]+)*$/)
    .withMessage(
      "First name can only contain letters, spaces, hyphens, and apostrophes."
    ),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required.")
    .isLength({ min: 2, max: 50 })
    .withMessage("Last name must be between 2 and 50 characters.")
    .matches(/^[a-zA-ZÀ-ÖØ-öø-ÿ]+(?:[-' ][a-zA-ZÀ-ÖØ-öø-ÿ]+)*$/)
    .withMessage(
      "Last name can only contain letters, spaces, hyphens, and apostrophes."
    ),
];

export const loginValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please provide a valid email address.")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required."),
];