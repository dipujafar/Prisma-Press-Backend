import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../lib/sendResponse";
import { userService } from "./user.service";

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
  const profile = await userService.getMyProfileFromDB(req.user.id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User profile fetched successfully",
    data: {
      profile,
    },
  });
});

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id as string;
  const payload = req.body;

  const updatedUser = await userService.updateMyProfile(userId, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User profile updated successfully",
    data: {
      updatedUser,
    },
  });
});

export const userController = {
  userRegister,
  getMyProfile,
  updateMyProfile,
};
