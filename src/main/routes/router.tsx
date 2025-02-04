
import { Roles } from "@/application/modules/auth/services/dto/account-dto";

import { AuthLayout } from "@/application/modules/auth/pages/layout";
import { SignIn } from "@/application/modules/auth/pages/sign-in/sign-in";
import { SignUp } from "@/application/modules/auth/pages/sign-up/sign-up";
import { DashboardLayout } from "@/application/modules/dashboard/layout";
import { CoursePage } from "@/application/modules/dashboard/pages/course/course-page";
import { Courses } from "@/application/modules/dashboard/pages/courses/courses-page";
import { CreateClassPage } from "@/application/modules/dashboard/pages/create-class/create-class-page";
import { CreateCourse } from "@/application/modules/dashboard/pages/create-course/create-course-page";
import { Home } from "@/application/modules/home/home-page";
import { BrowserRouter, Route, Routes } from "react-router";
import { AuthRoute } from "./auth-route";
import { ProtectedRoute } from "./protected-route";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<AuthRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute rolesAllowed={[Roles.TEACHER]} />}>
          <Route path="dashboard" element={<DashboardLayout />} >
            <Route path="" element={<Courses />} />
            <Route path="create-course/:type" element={<CreateCourse />} />
            <Route path="course/:courseId" element={<CoursePage />} />

            <Route path="course/:courseId/create-class" element={<CreateClassPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}