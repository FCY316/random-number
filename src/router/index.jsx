import React, { lazy, Suspense } from "react";
import LoadingPage from "./LoadingPage";
import { useRoutes } from "react-router-dom";
import Layout from "@/Layout";

const Home = lazy(
  async () => await import(/* webpackChunkName: "home" */ "@/pages/home")
);
const My = lazy(
  async () => await import(/* webpackChunkName: "home" */ "@/pages/my")
);
const Creation = lazy(
  async () => await import(/* webpackChunkName: "home" */ "@/pages/creation")
);
const Subscription = lazy(
  async () =>
    await import(/* webpackChunkName: "home" */ "@/pages/subscription")
);
const routeConfig = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/my",
        element: <My />,
      },
      {
        path: "/creation",
        element: <Creation />,
      },
      {
        path: "/subscription/:id",
        element: <Subscription />,
      },
    ],
  },
];

const AppRouter = () => {
  const element = useRoutes(routeConfig);
  return <Suspense fallback={<LoadingPage />}>{element}</Suspense>;
};
export default AppRouter;
