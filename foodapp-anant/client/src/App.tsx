import { useEffect } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { shallow } from "zustand/shallow";

import Login from "./auth/Login";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import VerifyEmail from "./auth/VerifyEmail";

import HereSection from "./components/HereSection";
import MainLayout from "./layout/MainLayout";
import Profile from "./components/Profile";
import SearchPage from "./components/SearchPage";
import RestaurantDetail from "./components/RestaurantDetail";
import Cart from "./components/Cart";
import Success from "./components/Success";
import Loading from "./components/Loading";

import Restaurant from "./admin/Restaurant";
import AddMenu from "./admin/AddMenu";
import Orders from "./admin/Orders";

import { useUserStore } from "./store/useUserStore";
import { useThemeStore } from "./store/useThemeStore";

interface ProtectedProps {
  children: JSX.Element;
}

const ProtectedRoutes = ({ children }: ProtectedProps) => {
  const { isAuthenticated, user } = useUserStore(
    (state) => ({ isAuthenticated: state.isAuthenticated, user: state.user }),
    shallow
  );
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user?.isVerified) return <Navigate to="/verify-email" replace />;
  return children;
};

const AuthenticatedUser = ({ children }: ProtectedProps) => {
  const { isAuthenticated, user } = useUserStore(
    (state) => ({ isAuthenticated: state.isAuthenticated, user: state.user }),
    shallow
  );
  if (isAuthenticated && user?.isVerified) return <Navigate to="/" replace />;
  return children;
};

const AdminRoute = ({ children }: ProtectedProps) => {
  const { user, isAuthenticated } = useUserStore(
    (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    shallow
  );
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user?.admin) return <Navigate to="/" replace />;
  return children;
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <MainLayout />
      </ProtectedRoutes>
    ),
    children: [
      { path: "/", element: <HereSection /> },
      { path: "profile", element: <Profile /> },
      { path: "search/:text", element: <SearchPage /> },
      { path: "restaurant/:id", element: <RestaurantDetail /> },
      { path: "cart", element: <Cart /> },
      { path: "order/status", element: <Success /> },

      // Admin routes
      {
        path: "admin/restaurant",
        element: (
          <AdminRoute>
            <Restaurant />
          </AdminRoute>
        ),
      },
      {
        path: "admin/menu",
        element: (
          <AdminRoute>
            <AddMenu />
          </AdminRoute>
        ),
      },
      {
        path: "admin/orders",
        element: (
          <AdminRoute>
            <Orders />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <AuthenticatedUser>
        <Login />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthenticatedUser>
        <Signup />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <AuthenticatedUser>
        <ForgotPassword />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
]);

function App() {
  const initializeTheme = useThemeStore((state) => state.initializeTheme);
  const { checkAuthentication, isCheckingAuth } = useUserStore(
    (state) => ({
      checkAuthentication: state.checkAuthentication,
      isCheckingAuth: state.isCheckingAuth,
    }),
    shallow
  );

  useEffect(() => {
    checkAuthentication();
    initializeTheme();
  }, [checkAuthentication, initializeTheme]);

  if (isCheckingAuth) return <Loading />;

  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );
}

export default App;
