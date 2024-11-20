import { NextFunction, Request, Response } from "express";
import { validationResult, ValidationChain, body } from "express-validator";

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        break;
      }
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(422).json({ errors: errors.array() });
  };
};

export const loginValidator = [
  body("email").trim().isEmail().withMessage("Please enter email"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Please enter password should be atleast 6 characters"),
];

export const signupValidator = [
  body("name").notEmpty().withMessage("Please enter"),
  ...loginValidator,
];
