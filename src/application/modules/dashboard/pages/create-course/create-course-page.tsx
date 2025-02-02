import { Input } from "@/application/shared/components/ui/input";

import { Alert, AlertDescription, AlertTitle } from "@/application/shared/components/ui/alert";
import { Button } from "@/application/shared/components/ui/button";
import { Card } from "@/application/shared/components/ui/card";
import { Label } from "@/application/shared/components/ui/label";
import { Progress } from "@/application/shared/components/ui/progress";
import { Switch } from "@/application/shared/components/ui/switch";
import { Loader2, Plus } from "lucide-react";
import { CurrencyInput } from 'react-currency-mask';
import { Controller, FormProvider } from "react-hook-form";
import { FileInput } from "./components/file-input";
import { TextInput } from "./components/text-input";
import { TextAreaInput } from "./components/textarea-input";
import { useCreateCourseController } from "./use-create-course-controller";

export function CreateCourse() {
  const { 
    form,
    type,
    isArchived, 
    setIsArchived, 
    bannerDropZone, 
    handleSubmit, 
    onSubmit, 
    uploadingFiles, 
    videoDropZone,
    banner,
    setBanner,
    setVideo,
    video
  } = useCreateCourseController();

  return (
    <>
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
    
      <div className="h-full w-full max-w-6xl flex justify-center items-center flex-col px-10 mx-auto">
        <div className="justify-start flex w-full mb-4">
          <h1 className="text-3xl font-bold">Criar curso</h1>
        </div>

        <FormProvider {...form}>
          <form onSubmit={onSubmit(handleSubmit)} className="w-full h-full flex-col gap-8 items-center justify-center">
            <div className="w-full flex gap-8 flex-col ">
              <div className="w-full h-full justify-between space-y-4 gap-8 flex">
                <div className="w-full space-y-2">
                  <TextInput 
                    label="Título do curso" 
                    description="Escolha um título claro e objetivo que represente bem o conteúdo do curso."
                    placeholder="Título"
                    field="name"
                  />

                  <TextAreaInput 
                    label="Descrição do curso" 
                    description="Explique em detalhes o que os alunos irão aprender e quais benefícios o curso oferece."
                    placeholder="Descrição"
                    field="description"
                  />
                </div>

                {type === 'paid' && (
                  <div className="w-full p-4 bg-muted-gradient rounded-md flex justify-center items-center">
                    <div className="space-y-2">
                      <div className="flex-col flex items-center">
                        <Label className="text-md">Valor do curso</Label>
                        <span className="text-sm text-muted-foreground text-center">
                          Defina um preço justo para seu curso. O pagamento será processado via Stripe e você receberá os valores conforme as regras da plataforma.
                        </span>
                      </div>
                      <Controller 
                        control={form.control}
                        name="priceInCents"
                        render={({ field: { value, onChange } }) => (
                          <CurrencyInput 
                            value={value}
                            onChangeValue={(_, floatValue) => onChange(floatValue)}
                            InputElement={<Input type="text" placeholder="Preço" />}
                          />
                        )}
                      />
                    </div>
                  </div>
                  )}
              </div>

              <div className="flex w-full h-full space-x-8">
                <FileInput 
                  state={bannerDropZone} 
                  label="Banner do curso"
                  description="Este será a imagem principal do seu curso."
                  file={banner}
                  onRemove={() => {
                    form.setValue('files.banner', undefined);
                    setBanner(undefined);
                  }}
                />

                <FileInput
                  state={videoDropZone}
                  label="Vídeo de preview do curso"
                  description="Qualquer pessoa poderá assisti-lo antes de comprar o curso."
                  file={video}
                  onRemove={() => {
                    form.setValue('files.video', undefined);
                    setVideo(undefined);
                  }}
                />
              </div>
            </div>

            <Card className="flex items-center justify-between w-full p-4 mt-4 rounded-md">
              <div className="space-y-1 flex flex-col">
                <Label className="text-md">Criar como arquivado</Label>
                <span className="text-sm text-muted-foreground">
                  O curso será criado, mas não ficará visível para os alunos até que seja ativado.
                </span>
              </div>
              <Switch checked={isArchived} onCheckedChange={setIsArchived} />
            </Card>
            <div className="flex justify-center w-full mt-10">
              <Button disabled={!form.formState.isValid} className="w-full" type="submit">
                <Plus className="size-10" />
                Criar curso
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  )
}