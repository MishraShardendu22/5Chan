import { z } from 'zod';

export const usernameValidation = z.string()
    .min(3, "Username Must be at least 3 characters")
    .max(255, "Username Must be at most 255 characters")
    .regex(/^[a-zA-Z0-9_]*$/, "Username Must contain only letters, numbers, and underscores");

export const emailValidation = z.string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid Email Address");

export const passwordValidation = z.string()
    .min(8, "Password Must be at least 8 characters")
    .max(128, "Password Must be at most 128 characters"); // Adjust max length as needed.

export const signUpSchema = z.object({
    username: usernameValidation,
    email: emailValidation,
    password: passwordValidation
});
