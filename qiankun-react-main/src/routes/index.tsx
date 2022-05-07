import { lazy, ReactNode, Suspense } from "react";
import { Navigate, RouteObject } from "react-router-dom";

const Login = lazy(() => import("../pages/Login"));

const LazyLoad = (e: ReactNode): ReactNode => {
  return <Suspense fallback={<>loading...</>}>{e}</Suspense>;
};

const routes: RouteObject[] = [
  {
    path: "*",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: LazyLoad(<Login />),
  },
];

export default routes;
