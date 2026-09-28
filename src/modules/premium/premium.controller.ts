import { sendResponse } from "../../lib/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import { premiumService } from "./premium.service";
import httpStatus from "http-status";
import { Request, Response } from "express";

const getPremiumContent = catchAsync(async (req: Request, res: Response) => {
  const result = await premiumService.getPremiumContent();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Premium content retrieved successfully",
    data: result,
  });
});

export const premiumController = {
  getPremiumContent,
};
