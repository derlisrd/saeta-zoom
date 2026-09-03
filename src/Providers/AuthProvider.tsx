import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { APICALLER } from '../Services/api';
import { supabase } from '../Services/supabase';
import { env } from '../App/config';
import { funciones } from '../App/helpers/funciones';
import swal from 'sweetalert';

const LoginContext = createContext<any>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const storage = JSON.parse(sessionStorage.getItem('userData') || 'null') ||
    JSON.parse(localStorage.getItem('userData') || 'null');
  const [loading, setLoading] = useState(true);

  const [dataEmpresa, setDataEmpresa] = useState(() => {
    const store = JSON.parse(localStorage.getItem('dataEmpresa') || 'null');
    return store ?? {};
  });

  const [load, setLoad] = useState({
    login: false,
    msj: null as string | null,
    active: false,
    code: 0,
  });

  const initialUserData = {
    login: false,
    remember: false,
    token_user: null as string | null,
    id_user: null as string | null,
    nombre_user: null as string | null,
    rol_user: null as number | null,
    username_user: null as string | null,
    permisos: [] as any[],
  };

  const [userData, setUserData] = useState(storage ?? initialUserData);

  const setearLogin = (f: typeof initialUserData, remember = false) => {
    setUserData(f);
    localStorage.removeItem('facturasStorage');
    localStorage.removeItem('dataProductos');
    localStorage.removeItem('compras');
    localStorage.removeItem('notas');
    sessionStorage.setItem('userData', JSON.stringify(f));
    if (remember) {
      localStorage.setItem('userData', JSON.stringify(f));
    }
  };

  const setearEmpresa = ({ empresa = null, mode }: { empresa?: any; mode: boolean }) => {
    if (mode) {
      localStorage.setItem('dataEmpresa', JSON.stringify(empresa));
      setDataEmpresa(empresa);
    } else {
      localStorage.removeItem('dataEmpresa');
      localStorage.removeItem('dataMonedas');
      setDataEmpresa({});
    }
  };

  const signingOut = useRef(false);

  const logOut = useCallback(async () => {
    if (signingOut.current) return;
    signingOut.current = true;

    setUserData({
      login: false,
      token_user: null,
      id_user: null,
      nombre_user: null,
      rol_user: null,
      username_user: null,
      remember: false,
      permisos: [],
    });
    setearEmpresa({ mode: false });
    localStorage.removeItem('userData');
    sessionStorage.removeItem('userData');
    localStorage.clear();
    try {
      await supabase.auth.signOut();
    } catch (e) {
      // ignorar error si no hay sesión activa
    } finally {
      signingOut.current = false;
    }
  }, []);

  const logIn = async (f: { email_user: string; password_user: string }, remember: boolean) => {
    setLoad({ login: true, active: false, msj: null, code: 0 });

    const res = await APICALLER.login(f);

    if (!res.response || res.found <= 0) {
      setLoad({ login: false, active: true, msj: res.message, code: res.error_code || 0 });
      return false;
    }

    const d = res.results[0];

    const [emp, permisosData] = await Promise.all([
      APICALLER.get({
        table: 'empresas',
        fields: 'categoria_empresa,nombre_empresa,propietario_empresa,ruc_empresa,direccion_empresa,mensaje_recibo_empresa,licencia',
      }),
      APICALLER.get({
        table: 'permisos_users',
        where: `id_user_permiso,=,${d.id_user}`,
        fields: 'id_permiso_permiso',
      }),
    ]);

    const dataEmpresa = emp.results?.[0];

    if (dataEmpresa && dataEmpresa.licencia) {
      const today = new Date();
      const fechaLicencia = funciones.splitFecha(dataEmpresa.licencia);
      if (today >= fechaLicencia) {
        setLoad({ login: false, active: true, msj: 'Su licencia ha vencido. Por favor contacte con el proveedor.' });
        return false;
      }
    }

    if (dataEmpresa) {
      setearEmpresa({ mode: true, empresa: dataEmpresa });
    }

    const datas = {
      ...d,
      login: true,
      token_user: d.token_user,
      username_user: d.username_user,
      permisos: permisosData.response ? permisosData.results : [],
    };

    setearLogin(datas, remember);
    setLoad({ login: false, active: false, msj: null });
    return true;
  };

  const authcheck = useCallback(async () => {
    const local = localStorage.getItem('userData') || sessionStorage.getItem('userData');
    if (userData.login && local) {
      setInterval(async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          logOut();
        }
      }, 300000);
    }
  }, [userData, logOut]);

  const verificar = useCallback(async () => {
    setLoading(true);
    const local = localStorage.getItem('userData') || sessionStorage.getItem('userData');
    if (userData.login && local) {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        swal({ icon: 'info', title: 'Error de conexión', text: 'Tienes problemas de conexión? Ocurrió un error.' });
        logOut();
      }
    }
    setLoading(false);
  }, [userData, logOut]);

  useEffect(() => {
    const ca = new AbortController();
    let isActive = true;
    if (isActive) {
      verificar();
      authcheck();
    }
    return () => {
      isActive = false;
      ca.abort();
    };
  }, [verificar, authcheck]);

  // Escuchar cambios de sesión de Supabase
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        logOut();
      }
    });

    return () => subscription.unsubscribe();
  }, [logOut]);

  const values = {
    userData,
    logIn,
    logOut,
    load,
    loading,
    dataEmpresa,
    setDataEmpresa,
    setearEmpresa,
  };

  return <LoginContext.Provider value={values}>{children}</LoginContext.Provider>;
};

export const useAuth = () => {
  const {
    userData,
    logIn,
    logOut,
    load,
    loading,
    dataEmpresa,
    setDataEmpresa,
    setearEmpresa,
  } = useContext(LoginContext);
  return {
    userData,
    logIn,
    logOut,
    load,
    loading,
    dataEmpresa,
    setDataEmpresa,
    setearEmpresa,
  };
};

export default AuthProvider;
