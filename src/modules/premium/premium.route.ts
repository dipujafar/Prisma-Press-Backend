import { Router } from "express";
import { premiumController } from "./premium.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { subscriptionGuard } from "../../middleware/subscriptionGuard";

const router = Router();

router.get(
  "/",
  auth(Role.USER, Role.ADMIN, Role.AUTHOR),
  subscriptionGuard(),
  premiumController.getPremiumContent,
);

export const premiumRoutes = router;
