import { lazy, ReactNode, Suspense } from "react";
import { Navigate, RouteObject } from "react-router-dom";

const Login = lazy(() => import("../pages/Login"));
const Home = lazy(() => import("../pages/Home"));

const LazyLoad = (e: ReactNode): ReactNode => {
  return <Suspense fallback={<>loading...</>}>{e}</Suspense>;
};

const routes: RouteObject[] = [
  {
    path: "/",
    element: LazyLoad(<Home />),
  },
  {
    path: "/login",
    element: LazyLoad(<Login />),
  },
  {
    path: "*",
    element: <Navigate to="/login" />,
  },
];

export default routes;
