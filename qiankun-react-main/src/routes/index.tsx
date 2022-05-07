import { lazy, ReactNode, Suspense } from "react";
import { RouteObject } from "react-router-dom";

const Counter = lazy(() => import('../controllers/counter/Counter'))

const LazyLoad = (e: ReactNode): ReactNode => {
  return (
    <Suspense fallback={<>loading...</>}>
      {e}
    </Suspense>
  )
}


const routes: RouteObject[] = [
  {
    path: '/',
    element: LazyLoad(<Counter />)
  }
]

export default routes