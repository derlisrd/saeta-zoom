import {  Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from 'react';
import LoadingPage from "../Components/UI/LoadingPage";
import { env } from "../App/config";
import { useAuth } from "../Providers/AuthProvider";


const Loadable = (Component) => (props) => {
    return (
      <Suspense
        fallback={
          <LoadingPage />
        }
      >
        <Component {...props} />
      </Suspense>
    );
};

function MainPages() {

  const {userData} = useAuth()
  const {permisos} = userData

  const PrivateRoute = ({children,id})=>{

    return permisos.some( elem=> parseInt(elem.id_permiso_permiso) === parseInt(id)) ? <>{children}</> : <Navigate to='/401' />
  }

  return (
    
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/401' element={<NotAutorizated />} />
        <Route path={env.LOGIN_PAGE_URL} element={<Login />} />
        
        <Route path="/admin" element={<Base />}>
          <Route path="home" element={<Home />} />
          <Route path="clientes" element={<PrivateRoute id='23'><Clientes /></PrivateRoute>} />
          <Route path="productos" element={<PrivateRoute id='27'><ListadoProductos /></PrivateRoute>} />
          <Route path="productos/add" element={<PrivateRoute id='28'><AddProducto /></PrivateRoute>} />
          <Route path="inventario" element={<PrivateRoute id='31'><Inventario /></PrivateRoute>} />
          <Route path="productos/edit/:id" element={<PrivateRoute id='29'><EditProduct /></PrivateRoute>} />
          <Route path="pedidos" element={<PrivateRoute id='9'><Pedidos /></PrivateRoute>} />
          <Route path="pedidos/lista" element={<PrivateRoute id='1'><ListaPedidos /></PrivateRoute>} />
          <Route path="pedidos/recibos" element={<PrivateRoute id='53'><RecibosPedidos /></PrivateRoute>} />
          <Route path="facturas" element={<PrivateRoute id='16'><Facturas /></PrivateRoute>} />
          <Route path="facturas/add" element={<PrivateRoute id='17'><AddFactura /></PrivateRoute>} />
          <Route path="facturas/lista" element={<PrivateRoute id='16'><ListaFacturas /></PrivateRoute>} />
          <Route path="descuentos" element={<PrivateRoute id='33'><Descuentos /></PrivateRoute>} />
          <Route path="proveedores" element={<Proveedores />} />
          <Route path="empleados" element={<PrivateRoute id='43'><Empleados /></PrivateRoute>} />
          <Route path="usuarios" element={<PrivateRoute id='15'><Usuarios /></PrivateRoute>} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="depositos" element={<PrivateRoute id='47'><Depositos /></PrivateRoute>} />
          <Route path="categorias" element={<PrivateRoute id='39'><Categorias /></PrivateRoute>} />
          <Route path="empresa" element={<PrivateRoute id='37'><Empresa /></PrivateRoute>} />
          <Route path="reportes/ventas" element={<PrivateRoute id='52'><ReportesVentas /></PrivateRoute>} />
          <Route path="financiero/recibos" element={<PrivateRoute id='57'><FinancieroRecibo /></PrivateRoute>} />
          <Route path="financiero/aciertos" element={<PrivateRoute id='57'><Aciertos /></PrivateRoute>} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    
  );
}

const Login = Loadable(lazy(() => import('./Auth/Login')));
const Home = Loadable(lazy(() => import('./Home')));
const Base = Loadable(lazy(() => import('./Base')));
const Clientes = Loadable(lazy(() => import('./Administracion/Clientes')));
const Proveedores = Loadable(lazy(() => import('./Administracion/Proveedores')));
const Empleados = Loadable(lazy(() => import('./RRHH/Empleados')));
const Depositos = Loadable(lazy(() => import('./Stock/Depositos')));
const Categorias = Loadable(lazy(() => import('./Stock/Categorias')));
const NotFound = Loadable(lazy(() => import('./Status/NotFound')));
const AddProducto = Loadable(lazy(() => import('./Stock/Productos/Add')));
const Inventario = Loadable(lazy(() => import('./Stock/Inventario')));
const EditProduct = Loadable(lazy(() => import('./Stock/Productos/Edit/EditProduct')));
const ListadoProductos = Loadable(lazy(() => import('./Stock/Productos/Listado')));
const Pedidos = Loadable(lazy(() => import('./Comercial/Pedidos')));
const ListaPedidos = Loadable(lazy(() => import('./Comercial/ListaPedidos')));
const Usuarios = Loadable(lazy(() => import('./Administracion/Usuarios')));
const Perfil = Loadable(lazy(() => import('./Administracion/Usuarios/Perfil')));
const Facturas = Loadable(lazy(() => import('./Comercial/Facturas')));
const ListaFacturas = Loadable(lazy(() => import('./Comercial/Facturas/Lista')));
const AddFactura = Loadable(lazy(() => import('./Comercial/Facturas/Add')));
const Empresa = Loadable(lazy(() => import('./Administracion/Empresa')));
const Descuentos = Loadable(lazy(() => import('./Administracion/Descuentos')));
const RecibosPedidos = Loadable(lazy(()=> import('./Comercial/RecibosPedidos')));
const ReportesVentas = Loadable(lazy(()=> import("./Reportes/Ventas") ));
const FinancieroRecibo = Loadable(lazy(()=> import("./Financiero/Recibos") ));
const Aciertos = Loadable(lazy(()=> import("./Financiero/Aciertos") ));

const NotAutorizated = Loadable(lazy(()=> import("./Status/NotAutorizated") ));

export default MainPages;
