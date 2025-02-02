import { Label } from "@/application/shared/components/ui/label";
import { Textarea } from "@/application/shared/components/ui/textarea";
import { FieldPath, useFormContext } from "react-hook-form";
import { CreateCourseDTO } from "../../../services/dto/course-dto";

interface IProps {
  label: string;
  description: string;
  placeholder: string;
  field: FieldPath<CreateCourseDTO>;
}


export function TextAreaInput({ description, label, placeholder, field }: IProps) {
  const { register } = useFormContext<CreateCourseDTO>();

  return (
    <div className="space-y-2">
      <div className="flex-col flex">
        <Label className="text-md">{label}</Label>
        <span className="text-sm text-muted-foreground">
          {description}
        </span>
      </div>
      <Textarea {...register(field)} placeholder={placeholder} />
    </div>
  )
}