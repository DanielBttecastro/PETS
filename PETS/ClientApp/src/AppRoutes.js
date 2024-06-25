import  {Login} from "./components/Login";
import { AdminPrincipal } from "./components/AdminPrincipal";
import { Home } from "./components/Home";
import { Clientes } from "./components/Clientes";
import { Medicos } from "./components/Medicos";
import { Razas } from "./components/Razas";
import { Medicamentos } from "./components/Medicamentos";
import { Informes } from "./components/Informes";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/Login',
    element: <Login />
  },
  {
    path: '/AdminPrincipal',
    element: <AdminPrincipal />
  },
  {
    path: '/Clientes',
    element: <Clientes />
  },
  {
    path: '/Medicos',
    element: <Medicos />
  },
  {
    path: '/Razas',
    element: <Razas />
  },
  {
    path: '/Medicamentos',
    element: <Medicamentos />
  },
  {
    path: '/Informes',
    element: <Informes />
  }
];

export default AppRoutes;
