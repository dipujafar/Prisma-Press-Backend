import { Router } from "express";
import { commentController } from "./comment.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/",
  auth(Role.USER, Role.ADMIN, Role.AUTHOR),
  commentController.createComment,
);

router.get(
  "/author/:authorId",
  auth(Role.USER, Role.ADMIN, Role.AUTHOR),
  commentController.getCommentByAuthorId,
);

router.get(
  "/:commentId",
  auth(Role.USER, Role.ADMIN, Role.AUTHOR),
  commentController.getCommentByCommentId,
);

router.patch(
  "/:commentId",
  auth(Role.USER, Role.ADMIN, Role.AUTHOR),
  commentController.updateComment,
);

router.delete(
  "/:commentId",
  auth(Role.USER, Role.ADMIN, Role.AUTHOR),
  commentController.deleteComment,
);

router.patch(
  "/:commentId/moderate",
  auth(Role.ADMIN),
  commentController.moderateComment,
);

export const commentRoutes = router;
