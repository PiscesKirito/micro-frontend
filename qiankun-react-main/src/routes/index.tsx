import { lazy, ReactNode, Suspense } from "react";
import { RouteObject } from "react-router-dom";

const Count = lazy(() => import("../controllers/counter/Counter"));
const Login = lazy(() => import("../pages/Login"));
const Home = lazy(() => import("../pages/Home"));

const LazyLoad = (e: ReactNode): ReactNode => {
  return <Suspense fallback={<>loading...</>}>{e}</Suspense>;
};

const routes: RouteObject[] = [
  {
    path: "/",
    element: LazyLoad(<Home />),
    children: [
      {
        index: true,
        element: LazyLoad(<Count />)
      }
    ]
  },
  {
    path: "/login",
    element: LazyLoad(<Login />),
  },
  {
    path: "*",
    element: LazyLoad(<Home />),
    // element: <Navigate to="/login" />,
  },
];

export default routes;
