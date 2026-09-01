export const BASEURL = import.meta.env.VITE_APP_BASEURL;
export const ICONAPP = import.meta.env.VITE_APP_ICON;
export const APPNAME = import.meta.env.VITE_APP_NAME;
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
export const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

export const env = {
  BASEURL,
  ICONAPP,
  APPNAME,
  SUPABASE_URL,
  SUPABASE_KEY,
  LOGIN_PAGE_URL: '/admin',
  HOME_PAGE_URL: '/admin/home',
  DRAWER_WIDTH: 175,
  ARMAZONES: [
    { id_armazon: '0', nombre_armazon: 'Ninguno' },
    { id_armazon: '1', nombre_armazon: 'Metal' },
    { id_armazon: '2', nombre_armazon: 'Acetato' },
    { id_armazon: '3', nombre_armazon: 'Nylon' },
    { id_armazon: '4', nombre_armazon: 'Balgrip' },
  ],
};
