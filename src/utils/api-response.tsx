import { BlogPost } from "@prisma/client";

export interface BlogApiResponse {
  success: boolean;
  message?: string;
  data?: BlogPost[];
  error?: Record<string, string[]>;
};
export interface SingleApiResponse{
  success: boolean;
  message?: string;
  data?: BlogPost;
  error?: Record<string, string[]>;
};

