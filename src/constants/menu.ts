type menuType = {
    id: number;
    title: string;
    descripcion: string | null;
    icon: string;
    url: string | null;
    submenu: menuType[] | null;
    open?: boolean;
    private: boolean;
}

const menu: menuType[] = [
  {
    id: 1,
    title: "Inicio",
    icon: "home",
    url: "/",
    private: false,
    submenu: null,
    descripcion: "Inicio"
  },
 {
    id: 3438,
    title: "Productos",
    icon: "packages",
    url: null,
    private: false,
    open: false,
    descripcion: null,
    submenu: [
      {
        id: 145,
        title: "Agregar producto",
        icon: "add",
        url: "/productos/add",
        private: false,
        descripcion: "Agregar producto",
        submenu: null
      },
      {
        id: 343,
        title: "Lista de productos",
        icon: "list",
        url: "/productos/lista",
        private: false,
        descripcion: "Lista de productos",
        submenu: null
      },
      {
        id: 3431,
        title: "Inventario",
        icon: "list",
        url: "/productos/carga-stock",
        private: false,
        descripcion: "Inventario de productos",
        submenu: null
      },

      {
        id: 1425,
        title: "Categorias",
        icon: "category",
        url: "/productos/categorias",
        private: false,
        descripcion: "Lista de categorias",
        submenu: null
      }
    ]
  },
];

export default menu;
