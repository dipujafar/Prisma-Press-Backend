import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../lib/sendResponse";
import { userService } from "./user.service";
import jwt from "jsonwebtoken";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";

// const userRegister = async (req: Request, res: Response) => {
//   try {
//     const payload = req.body;
//     const user = await UserService.registerUserInDB(payload);
//     res.status(httpStatus.CREATED).json({
//       success: true,
//       statusCode: httpStatus.CREATED,
//       message: "User register successfully",
//       data: {
//         user,
//       },
//     });
//   } catch (error) {
//     res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//       success: false,
//       statusCode: httpStatus.INTERNAL_SERVER_ERROR,
//       message: "Failed to register user",
//       error: (error as Error).message,
//     });
//   }
// };

const userRegister = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const user = await userService.registerUserInDB(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User register successfully",
      data: {
        user,
      },
    });
  },
);

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const { accessToken } = req.cookies;
  // console.log(accessToken);

  const verifiedToken = jwtUtils.verifyToken(
    accessToken,
    config.jwt_access_secret,
  );

  if (typeof verifiedToken === "string") {
    throw new Error(verifiedToken);
  }

  const profile = await userService.getMyProfileFromDB(verifiedToken.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User profile fetched successfully",
    data: {
      profile,
    },
  });
});

export const userController = {
  userRegister,
  getMyProfile,
};
