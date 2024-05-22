import AppLayout from "./AppLayout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./components/Home";
import AddPatientPage from "./components/AddPatients";
import Patient from "./components/patient";
import PatientsPage from "./components/Patinents";
import Login from "./components/Login";
import { AuthProvider } from "./context/AuthContext";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/patient/:id", element: <Patient /> },
      { path: "/patients", element: <PatientsPage /> },
      { path: "/add-patient", element: <AddPatientPage /> },
    ],
  },
  { path: "/login", element: <Login /> },
]);

function App() {
  return (
    <AuthProvider>
      <Toaster />
      <RouterProvider router={routes} />
    </AuthProvider>
  );
}

export default App;
