const { z } = require("zod");
const validator = require("validator");

const logInZodSchema = z.object({
  username: z
    .string({ required_error: "username is required" })
    .trim()
    .nonempty({ message: "name can't be empty" })
    .min(3, { message: "must be at least 3 characters long" })
    .max(30, { message: "must not exceed 30 characters" })
    .superRefine((value, ctx) => {
      if (/\d/.test(value)) {
        ctx.addIssue({
          code: "digit included name",
          message: "digits are not allowed in name",
        });
      }

      if (/[^A-Za-z\s\d]/.test(value)) {
        ctx.addIssue({
          code: "special char included name",
          message: "special characters are not allowed in name",
        });
      }
    }),

  email: z
    .string({ required_error: "email is required" })
    .trim()
    .nonempty({ message: "email can't be empty" })
    .lowercase({ message: "email usually in lowercase" })
    .refine(validator.isEmail, { message: "invalid email format" }),

  password: z
    .string({ required_error: "password is required" })
    .trim()
    .nonempty({ message: "password is required" })
    .min(8, { message: "must be of atleast 8 chars long" })
    .max(12, { message: "must not exceed 12 characters" })
    .regex(/[A-Z]/, { message: "atleast an uppercase letter" })
    .regex(/[a-z]/, { message: "atleast one lowercase letter" })
    .regex(/[0-9]/, { message: "atleast one digit please" })
    // .regex(/[^A-Za-z0-9]/,{message:"atleast one special character"})
    .refine(
      (val) =>
        validator.isStrongPassword(val, {
          minSymbols: 1,
        }),
      {
        message: "atleast one special character",
      },
    ),
});

const signUpZodSchema = z.object({
  username: z
    .string({ required_error: "username is required" })
    .trim()
    .nonempty({ message: "name can't be empty" })
    .min(3, { message: "must be at least 3 characters long" })
    .max(30, { message: "must not exceed 30 characters" })
    .superRefine((value, ctx) => {
      if (/\d/.test(value)) {
        ctx.addIssue({
          code: "digit included name",
          message: "digits are not allowed in name",
        });
      }

      if (/[^A-Za-z\s\d]/.test(value)) {
        ctx.addIssue({
          code: "special char included name",
          message: "special characters are not allowed in name",
        });
      }
    }),

  email: z
    .string({ required_error: "email is required" })
    .trim()
    .nonempty({ message: "email can't be empty" })
    .lowercase({ message: "email usually in lowercase" })
    .refine(validator.isEmail, { message: "invalid email format" }),

  password: z
    .string({ required_error: "password is required" })
    .trim()
    .nonempty({ message: "password is required" })
    .min(8, { message: "must be of atleast 8 chars long" })
    .max(12, { message: "must not exceed 12 characters" })
    .regex(/[A-Z]/, { message: "atleast an uppercase letter" })
    .regex(/[a-z]/, { message: "atleast one lowercase letter" })
    .regex(/[0-9]/, { message: "atleast one digit please" })
    // .regex(/[^A-Za-z0-9]/,{message:"atleast one special character"})
    .refine(
      (val) =>
        validator.isStrongPassword(val, {
          minSymbols: 1,
        }),
      {
        message: "atleast one special character",
      },
    ),
});

const passResetZodSchema = logInZodSchema.extend({
  email: z
    .string({ required_error: "email is required" })
    .trim()
    .nonempty({ message: "email can't be empty" })
    .lowercase({ message: "email usually in lowercase" })
    .refine(validator.isEmail, { message: "invalid email format" }),

  newPassword: z
    .string({ required_error: "password is required" })
    .trim()
    .nonempty({ message: "password is required" })
    .min(8, { message: "must be of atleast 8 chars long" })
    .max(12, { message: "must not exceed 12 characters" })
    .regex(/[A-Z]/, { message: "atleast an uppercase letter" })
    .regex(/[a-z]/, { message: "atleast one lowercase letter" })
    .regex(/[0-9]/, { message: "atleast one digit please" })
    // .regex(/[^A-Za-z0-9]/,{message:"atleast one special character"})
    .refine(
      (val) =>
        validator.isStrongPassword(val, {
          minSymbols: 1,
        }),
      {
        message: "atleast one special character",
      },
    ),
});

const passResetWithOtpZodSchema = z.object({
  email: z
    .string({ required_error: "email is required" })
    .trim()
    .nonempty({ message: "email can't be empty" })
    .lowercase({ message: "email usually in lowercase" })
    .refine(validator.isEmail, { message: "invalid email format" }),

  password: z
    .string({ required_error: "password is required" })
    .trim()
    .nonempty({ message: "password is required" })
    .min(8, { message: "must be of atleast 8 chars long" })
    .max(12, { message: "must not exceed 12 characters" })
    .regex(/[A-Z]/, { message: "atleast an uppercase letter" })
    .regex(/[a-z]/, { message: "atleast one lowercase letter" })
    .regex(/[0-9]/, { message: "atleast one digit please" })
    // .regex(/[^A-Za-z0-9]/,{message:"atleast one special character"})
    .refine(
      (val) =>
        validator.isStrongPassword(val, {
          minSymbols: 1,
        }),
      {
        message: "atleast one special character",
      },
    ),
});
module.exports = {
  signUpZodSchema,
  logInZodSchema,
  passResetZodSchema,
  passResetWithOtpZodSchema,
};
