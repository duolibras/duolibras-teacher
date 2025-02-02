import { PresignedPost, presignedPostFileDTO } from "@/application/shared/services/dto/presigned-post-dto";
import { z } from "zod";

export interface SummaryCourse {
  id: string;
  name: string;
  description: string;
  bannerUrl: string | null;
  hasVideoPreview: boolean;
  preemium: boolean;
  priceInCents: number | undefined;
  classCount: number;
  studentsCount: number;
  teacherId: string;
  archived: boolean;
  owned: boolean;
}

export interface GetCoursesResponse {
  courses: SummaryCourse[]
}

export const createCourseDTO = z.object({
  name: z.string(),
  description: z.string(),
  preemium: z.boolean(),
  priceInCents: z.number().optional(),
  archived: z.boolean().optional().transform(v => !!v),
  files: z.object({
    banner: presignedPostFileDTO.optional(),
    video: presignedPostFileDTO.optional(),
  }).optional(),
});

export type CreateCourseDTO = z.infer<typeof createCourseDTO>;

export interface CreateCourseResponse {
  id: string;
  name: string;
  description: string;
  bannerUrl: string | null;
  videoUrl: string | null;
  preemium: boolean;
  priceInCents: number | undefined;
  classCount: number;
  studentsCount: number,
  teacherId: string,
  archived: boolean,
  owned: boolean,
  createdAt: Date,
  updatedAt: Date,
  presignedUrls: {
    banner?: PresignedPost;
    video?: PresignedPost;
  }
}