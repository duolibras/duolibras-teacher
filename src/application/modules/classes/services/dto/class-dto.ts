import { PresignedPost, presignedPostFileDTO } from "@/application/shared/services/dto/presigned-post-dto";
import { z } from "zod";

export interface SummaryClass {
  id: string;
  name: string;
  description: string;
  archived: boolean;
  bannerUrl: string | null;
}

export interface GetClassesResponse {
  classes: SummaryClass[]
};

export const createClassDTO = z.object({
  name: z.string().min(1, 'O nome da aula é obrigatório'),
  description: z.string().min(1, 'A descrição da aula é obrigatória'),
  courseId: z.string().ulid(),
  archived: z.boolean().optional().transform(v => !!v),
  files: z.object({
    banner: presignedPostFileDTO.optional(),
    video: presignedPostFileDTO.optional(),
  }).optional(),
});

export type CreateClassDTO = z.infer<typeof createClassDTO>;

export interface Class {
  id: string;
  name: string;
  description: string;
  archived: boolean;
  bannerUrl: string | null;
  videoUrl: string | null;
  courseId: string;
  teacherId: string;
  presignedPosts: {
    banner?: PresignedPost;
    video?: PresignedPost;
  }
}

export interface CreateClassResponse {
  courseClass: Class
}