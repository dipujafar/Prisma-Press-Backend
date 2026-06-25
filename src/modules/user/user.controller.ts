import { Request, Response } from "express";
import { RegisterUserPayload } from "./user.interface";
import { UserService } from "./user.service";
import httpStatus from "http-status";

const userRegister = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const user = await UserService.registerUserInDB(payload);
    res.status(httpStatus.CREATED).json({
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User register successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Failed to register user",
      error: (error as Error).message,
    });
  }
};

export const UserController = {
  userRegister,
};
