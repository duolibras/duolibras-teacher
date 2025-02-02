import { Roles } from "@/application/modules/auth/services/dto/account-dto";
import { makeAuthService } from "@/application/modules/auth/services/make-auth-service";
import { Navigate, Outlet } from "react-router";

interface IProps {
  rolesAllowed?: Roles[];
}

export function AuthRoute({ rolesAllowed }: IProps) {
  const authService = makeAuthService();
  const { accessToken, role } = authService.getToken();

  if (
    accessToken ||
    role && rolesAllowed && rolesAllowed?.includes(role)
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}