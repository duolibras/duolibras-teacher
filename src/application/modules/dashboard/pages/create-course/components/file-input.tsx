import { AspectRatio } from "@/application/shared/components/ui/aspect-ratio";
import { Label } from "@/application/shared/components/ui/label";
import { cn } from "@/application/shared/lib/utils";
import { CloudUploadIcon, X } from "lucide-react";
import { DropzoneState } from "react-dropzone";

interface IProps {
  label: string;
  description: string;
  state: DropzoneState;
  file?: File | null;
  onRemove?: () => void;
}

export function FileInput({ state, description, label, file, onRemove }: IProps) {
  const { getRootProps, isDragActive, getInputProps } = state;

  return (
    <div className="w-full justify-between flex flex-col">
      <div className="flex flex-col mb-4">
        <Label className="text-md">{label}</Label>
        <span className="text-muted-foreground text-sm">{description}</span>
      </div>
      
      <div className="max-w-[600px] w-full">
        <AspectRatio ratio={16 / 9}>
          <div 
            {...getRootProps()}
            className={cn(
              "w-full h-full border border-dashed p-10 rounded-lg conteúdor-pointer transition-colors flex flex-col items-center text-muted-foreground justify-center hover:bg-accent",
              isDragActive && 'bg-accent'
            )}
          >
            {file ? (
              <>
                {file.type.startsWith("image/") ? (
                  <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-auto rounded-md" />
                ) : file.type.startsWith("video/") ? (
                  <video 
                    controls 
                    className="w-full rounded-md"
                    controlsList="noplaybackrate nodownload"
                  >
                    <source src={URL.createObjectURL(file)} type={file.type} />
                    Seu navegador não suporta o vídeo.
                  </video>
                ) : null}
                
                <button
                  type="button"
                  className="absolute top-2 right-2 text-white p-1 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove?.();
                  }}
                >
                  <X className="size-4" />
                </button>
                
                <input {...getInputProps()} />
                <span className="text-sm text-muted-foreground mt-2">Arraste outro arquivo para substituir</span>
              </>
            ) : (
              <>
                <CloudUploadIcon className="size-10" />
                <input {...getInputProps()} />
                <span className="text-center">Escolha um {label.toLowerCase()} ou arraste e solte aqui</span>
              </>
            )}
          </div>
        </AspectRatio>
      </div>
    </div>
  );
}
