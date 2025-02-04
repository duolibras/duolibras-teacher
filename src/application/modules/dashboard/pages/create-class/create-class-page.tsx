
import { useCreateClass } from "@/application/modules/classes/hooks/use-create-class";
import { GET_CLASSES_QUERY_KEY } from "@/application/modules/classes/hooks/use-get-classes";
import { createClassDTO, CreateClassDTO } from "@/application/modules/classes/services/dto/class-dto";
import { GoBackButton } from "@/application/shared/components/go-back-button";
import { Alert, AlertDescription, AlertTitle } from "@/application/shared/components/ui/alert";
import { Button } from "@/application/shared/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/application/shared/components/ui/form";
import { Input } from "@/application/shared/components/ui/input";
import { Progress } from "@/application/shared/components/ui/progress";
import { Switch } from "@/application/shared/components/ui/switch";
import { Textarea } from "@/application/shared/components/ui/textarea";
import { PresignedPost } from "@/application/shared/services/dto/presigned-post-dto";
import { uploadFile } from "@/application/shared/services/upload-file";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { FileInput } from "../create-course/components/file-input";

export function CreateClassPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string; }>();

  const form = useForm<CreateClassDTO>({
    defaultValues: {
      courseId,
    },
    resolver: zodResolver(createClassDTO)
  });

  const [banner, setBanner] = useState<File>();
  const [video, setVideo] = useState<File>();

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
    accept: { 'video/mp4': [] },
    onDrop: ([acceptedFile]) => {
      form.setValue('files.video', {
        filename: acceptedFile.name,
        fileSize: acceptedFile.size,
        fileType: acceptedFile.type,
      });
      setVideo(acceptedFile)
    }
  });

  const { createClass } = useCreateClass();

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

  const handleSubmit: SubmitHandler<CreateClassDTO> = async (dto) => {
    const { data } = await createClass(dto);

    const presignedPosts = data.courseClass.presignedPosts;

    const uploads: Promise<void>[] = [];

    if (banner && presignedPosts.banner) {
      uploads.push(handleUpload(banner, presignedPosts.banner));
    }

    if (video && presignedPosts.video) {
      uploads.push(handleUpload(video, presignedPosts.video));
    }

    await Promise.all(uploads);

    queryClient.invalidateQueries({
      queryKey: GET_CLASSES_QUERY_KEY(courseId)
    });

    navigate(-1);

    toast.success('Aula criada com sucesso')
  };

  return (
    <>
      <GoBackButton />

      <div className="p-4 max-w-screen-lg w-full mx-auto">
        <div className="fixed bottom-10 right-10 space-y-4">
          {Object.entries(uploadingFiles).map(([fileName, progress]) => (
            <Alert key={fileName}>
              <Loader2 className="h-4 w-4 animate-spin" />
              <AlertTitle>Fazendo upload: {fileName}</AlertTitle>
              <AlertDescription>
                <Progress value={progress} />
              </AlertDescription>
            </Alert>
          ))}
        </div>
        <h1 className="text-3xl font-bold mb-4">
          Criar aula
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="space-y-4">
              <FormField 
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome da aula</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <div className="flex justify-between items-center">
                      <FormDescription>O nome ou título da aula</FormDescription>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField 
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição da aula</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <div className="flex justify-between items-center">
                      <FormDescription>A descrição do que é ensinado nessa aula em específico</FormDescription>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <FileInput 
                  state={bannerDropZone} 
                  label="Banner da aula"
                  description="Este será a imagem de apresentação da aula."
                  file={banner}
                  onRemove={() => {
                    form.setValue('files.banner', undefined);
                    setBanner(undefined);
                  }}
                />

                <FileInput
                  state={videoDropZone}
                  label="Aula"
                  description="O video da aula em si"
                  file={video}
                  onRemove={() => {
                    form.setValue('files.video', undefined);
                    setVideo(undefined);
                  }}
                />
              </div>

              <FormField
                control={form.control}
                name="archived"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Criar como arquivada
                      </FormLabel>
                      <FormDescription>
                        O aula será criada, mas não ficará visível para os alunos até que seja ativada.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch 
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex mt-10">
              <Button disabled={!form.formState.isValid && form.formState.isSubmitted} type="submit" className="w-full ">
                <Plus />
                Criar aula
              </Button>
            </div>
          </form>

        </Form>
      </div>
    </>
  );
};