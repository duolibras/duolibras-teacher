import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";

export function GoBackButton() {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <Button variant="link" className="flex gap-2" onClick={() => navigate(-1)}>
        <ArrowLeft />
        Voltar
      </Button>
    </div>
  )
}