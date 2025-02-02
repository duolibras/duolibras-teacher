import { z } from 'zod';

export const presignedPostFileDTO = z.object({
  filename: z.string(),
  fileType: z.string(),
  fileSize: z.number(),
});

export interface PresignedPost {
  url: string;
  fields: Record<string, string>;
};