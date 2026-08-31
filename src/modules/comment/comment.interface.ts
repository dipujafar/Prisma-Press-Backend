import { CommentStatus } from "../../../generated/prisma/enums";

export interface ICreateCommentPayload {
  content: string;

  authorId: string;

  postId: string;
}

export interface IUpdateCommentPayload {
  content?: string;
  status?: keyof typeof CommentStatus;
}

export interface IModerateCommentPayload {
  status: keyof typeof CommentStatus;
}
