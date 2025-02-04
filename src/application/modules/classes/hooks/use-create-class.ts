import { useMutation } from "@tanstack/react-query";
import { makeClassService } from "../services/make-class-service";

export function useCreateClass() {
  const classService = makeClassService();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: classService.createClass.bind(classService)
  });

  return {
    createClass: mutateAsync,
    isLoading: isPending,
  }
}