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
    id: 2,
    title: "Comercial",
    icon: "ad-2",
    url: null,
    private: false,
    open: false,
    descripcion: null,
    submenu: [
      {
        id: 1,
        title: "Crear pedido",
        icon: "add",
        url: "/pedidos/add",
        private: false,
        descripcion: "Crear pedido",
        submenu: null
      },
      {
        id: 2,
        title: "Pedidos",
        icon: "list",
        url: "/pedidos",
        private: false,
        descripcion: "Lista de pedidos",
        submenu: null
      },
    ]
  },
  {
    id: 3,
    title: "Financiero",
    icon: "ad-2",
    url: null,
    private: false,
    open: false,
    descripcion: null,
    submenu: [
      {
        id: 145,
        title: "Facturas",
        icon: "add",
        url: "/facturas",
        private: false,
        descripcion: "Facturas",
        submenu: null
      },
    ]
  },
 {
    id: 4,
    title: "Inventario",
    icon: "packages",
    url: null,
    private: false,
    open: false,
    descripcion: null,
    submenu: [
      {
        id: 145,
        title: "Crear producto",
        icon: "add",
        url: "/productos/add",
        private: false,
        descripcion: "Agregar producto",
        submenu: null
      },
      {
        id: 343,
        title: "Productos",
        icon: "list",
        url: "/productos",
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
  {
    id: 6,
    title: "Administración",
    icon: "packages",
    url: null,
    private: false,
    open: false,
    descripcion: null,
    submenu: [
      {
        id: 145,
        title: "Empresa",
        icon: "add",
        url: "/empresa",
        private: false,
        descripcion: "Empresa",
        submenu: null
      },
    ]
  },
];

export default menu;
