import { PresignedPost } from "@/application/shared/services/dto/presigned-post-dto";
import { uploadFile } from "@/application/shared/services/upload-file";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router";
import { toast } from "sonner";
import { useCreateCourse } from "../../hooks/use-create-course";
import { CreateCourseDTO, createCourseDTO } from "../../services/dto/course-dto";

export function useCreateCourseController() {
  const { type } = useParams<{ type: 'paid' | 'free' }>();
  const form = useForm<CreateCourseDTO>({
    resolver: zodResolver(createCourseDTO),
  });

  const [banner, setBanner] = useState<File>();
  const [video, setVideo] = useState<File>();

  const { createCourse } = useCreateCourse();

  const { handleSubmit: onSubmit, register } = form;

  const [isArchived, setIsArchived] = useState(false);

  const bannerDropZone = useDropzone({
    multiple: false,
    accept: { 'image/*': [] },
    onDrop: ([acceptedFile]) => {
      form.setValue('files.banner', {
        filename: acceptedFile.name,
        fileSize: acceptedFile.size,
        fileType: acceptedFile.type,
      });
      setBanner(acceptedFile);
    },
  });

  const videoDropZone = useDropzone({
    multiple: false,
    accept: { 'video/*': [] },
    onDrop: ([acceptedFile]) => {
      form.setValue('files.video', {
        filename: acceptedFile.name,
        fileSize: acceptedFile.size,
        fileType: acceptedFile.type,
      });
      setVideo(acceptedFile)
    }
  });
  const [uploadingFiles, setUploadingFiles] = useState<Record<string, number>>({});

  const handleUpload = async (file: File, presignedUrl: PresignedPost) => {
    if (!presignedUrl) return;
    
    const { fields, url } = presignedUrl;
    const formData = new FormData();

    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append('file', file);

    setUploadingFiles((prev) => ({ ...prev, [file.name]: 0 }));

    await uploadFile(url, formData, (progress) => {
      setUploadingFiles((prev) => ({ ...prev, [file.name]: progress }));
    });

    setUploadingFiles((prev) => {
      const updated = { ...prev };
      delete updated[file.name];
      return updated;
    });
  };

  const handleSubmit: SubmitHandler<CreateCourseDTO> = async (dto) => {
    if (dto.priceInCents) {
      dto.priceInCents = dto.priceInCents * 100;
    }
    const { data } = await createCourse(dto);
    const presignedUrls = data.presignedUrls;

    const uploads: Promise<void>[] = [];

    if (banner && presignedUrls.banner) {
      uploads.push(handleUpload(banner, presignedUrls.banner));
    }

    if (video && presignedUrls.video) {
      uploads.push(handleUpload(video, presignedUrls.video));
    }

    await Promise.all(uploads);

    toast.success('Curso criado com sucesso')
  };

  useEffect(() => {
    form.setValue('preemium', type === 'paid')
  }, [type, form]);

  return {
    form,
    type,
    isArchived,
    setIsArchived,
    handleSubmit,
    uploadingFiles,
    bannerDropZone,
    videoDropZone,
    onSubmit,
    register,
    banner,
    setBanner,
    video,
    setVideo,
  }
}