export const BASEURL =  import.meta.env.VITE_APP_BASEURL; //'/vikki'; // aqui debe ir al final sin la barra ej: /carpeta/otracaperta
export const ICONAPP = import.meta.env.VITE_APP_ICON; //export const ICONAPP = 'content_cut'; // DEBE ESTAR INSTALADO GOOGLE FONTS ICONS https://fonts.google.com/icons?selected=Material+Icons
export const APIURL = import.meta.env.VITE_APP_API_URL_END_POINT; // ejemplo: http://dominio.com/api/
export const APPNAME = import.meta.env.VITE_APP_NAME;
export const XAPITOKEN = import.meta.env.VITE_APP_X_API_TOKEN;
export const SECRETO =  import.meta.env.VITE_APP_SECRETO;



export const env = {
    BASEURL, 
    ICONAPP, 
    APIURL, 
    APPNAME,
    XAPITOKEN,
    SECRETO,
    LOGIN_PAGE_URL : '/admin',
    HOME_PAGE_URL: '/admin/home',
    DRAWER_WIDTH: 175,
    ARMAZONES:[
        {
            id_armazon:'0',
            nombre_armazon: 'Ninguno'
        },
        {
            id_armazon:'1',
            nombre_armazon: 'Metal'
        },
        {
            id_armazon:'2',
            nombre_armazon: 'Acetato'
        },
        {
            id_armazon:'3',
            nombre_armazon: 'Nylon'
        },
        {
            id_armazon:'4',
            nombre_armazon: 'Balgrip'
        }
    ]
}