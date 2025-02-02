import { useCreatePaymentDetails } from "@/application/modules/account/hooks/use-create-payment-details";
import { useUpdatePaymentDetails } from "@/application/modules/account/hooks/use-update-payment-details";
import { AccountPaymentDetailsStatus } from "@/application/modules/account/service/dto/payment-details-dto";
import { useMe } from "@/application/modules/auth/hooks/use-me";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/application/shared/components/ui/alert-dialog";
import { Button } from "@/application/shared/components/ui/button";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";

import { LucidePlusCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

interface IProps {
  children: React.ReactNode;
}

export function CreateCourseModal({ children }: IProps) {
  const { profile } = useMe();
  const { createPaymentDetails } = useCreatePaymentDetails();
  const { updatePaymentDetails } = useUpdatePaymentDetails();
  const navigate = useNavigate();

  const [isCreateCourseModalOpen, setIsCreateCourseModalOpen] = useState<boolean>(false);
  const [isCreatePaymentDataModalOpen, setIsCreatePaymentDataModalOpen] = useState<boolean>(false);
  const [action, setAction] = useState<'update' | 'create' | null>(null);

  function handleCreateFreeCourse() {
    navigate('/dashboard/create-course/free')
  }

  function handleCreatePaidCourse() {
    const hasPaymentDetails = profile.paymentDetails.hasPaymentDetails;
    const shallUpdatePaymentDEtails = hasPaymentDetails && profile.paymentDetails.status !== AccountPaymentDetailsStatus.COMPLETED;

    if (!hasPaymentDetails) {
      setAction('create')
      setIsCreatePaymentDataModalOpen(true);
      return;
    }

    if (shallUpdatePaymentDEtails) {
      setAction('update')
      setIsCreatePaymentDataModalOpen(true);
      return;
    }

    navigate('/dashboard/create-course/paid')
  }

  async function handleCreatePaymentDetails() {
    if (!profile.paymentDetails.status) {
      return await createPaymentDetails({ returnUrl: 'http://localhost:5173/dashboard/' })
    }

    if (profile.paymentDetails.status !== AccountPaymentDetailsStatus.COMPLETED) {
      return await handleUpdatePaymentDetails();
    }
  }

  async function handleUpdatePaymentDetails() {
    await updatePaymentDetails({ returnUrl: 'http://localhost:5173/dashboard/create-course' })
  }

  return (
    <>
    <Button onClick={() => setIsCreateCourseModalOpen(true)}>
      <LucidePlusCircle className="size-4" />
      {children}
    </Button>

      <AlertDialog onOpenChange={setIsCreateCourseModalOpen} open={isCreateCourseModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Qual tipo de curso você quer criar?</AlertDialogTitle>
            <AlertDialogDescription>
              Você pode decidir se quer criar um curso gratuito ou pago.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleCreateFreeCourse}>Criar curso gratuito</AlertDialogAction>
            <AlertDialogAction onClick={handleCreatePaidCourse}>Criar curso pago</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Modal de curso pago */}
      <AlertDialog open={isCreatePaymentDataModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{action === 'create' ? 'Cadastrar' : 'Atualizar'} detalhes de pagamento</AlertDialogTitle>
            <AlertDialogDescription>
              Para criar um curso pago, você precisa {action === 'create' ? 'cadastrar' : 'atualizar'} seus detalhes de pagamentos, assim podemos repassar o dinheiro das compras pra você 😀
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsCreatePaymentDataModalOpen(false)}>
              {action === 'create' ? 'Cadastrar' : 'Atualizar'} depois
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleCreatePaymentDetails}>
              {action === 'create' ? 'Cadastrar' : 'Atualizar'} detalhes de pagamento
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}