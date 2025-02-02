
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface IProps {
  label: string;
}

export function InputField(props: IProps) {
  const { label } = props;

  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      <Input />
    </div>
  )
}