import { PostStatus } from "../../../generated/prisma/enums";
import { PostWhereInput } from "../../../generated/prisma/models";

export interface ICreatePostPayload {
  title: string;
  content: string;
  thumbnail?: string;
  isFeatured?: boolean;
  status: PostStatus;
  tags: string[];
}

export interface IPostQuery extends PostWhereInput {
  searchTerm?: string;
  limit?: number;
  page?: number;
  sortOrder?: string;
  sortBy?: string;
}
