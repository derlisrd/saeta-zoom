-- =====================================================
-- SAETA ZOOM - Supabase Schema (PostgreSQL)
-- Migrado desde MySQL
-- =====================================================

-- =====================================================
-- TABLAS DE AUTENTICACIÓN
-- =====================================================

-- Tabla de perfiles (vinculada a auth.users de Supabase)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  rol INTEGER DEFAULT 2,
  estado INTEGER DEFAULT 1,
  fecha_creacion TIMESTAMPTZ DEFAULT NOW(),
  try_login INTEGER DEFAULT 0,
  last_login TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABLAS DE NEGOCIO
-- =====================================================

-- Empresas
CREATE TABLE IF NOT EXISTS empresas (
  id_empresa SERIAL PRIMARY KEY,
  nombre_empresa VARCHAR(100) NOT NULL,
  propietario_empresa VARCHAR(100),
  ruc_empresa VARCHAR(50) NOT NULL,
  direccion_empresa VARCHAR(150) NOT NULL,
  telefono_empresa VARCHAR(150) NOT NULL,
  impuesto_empresa VARCHAR(25) NOT NULL,
  categoria_empresa TEXT NOT NULL,
  dimension_ticket INTEGER NOT NULL,
  licencia DATE NOT NULL,
  tipo_papel SMALLINT NOT NULL,
  mensaje_recibo_empresa VARCHAR(200),
  cuota_empresa SMALLINT DEFAULT 0,
  logo_url_empresa TEXT,
  configurado SMALLINT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categorías
CREATE TABLE IF NOT EXISTS categorias (
  id_categoria SERIAL PRIMARY KEY,
  nombre_categoria VARCHAR(150) NOT NULL,
  tipo_categoria INTEGER DEFAULT 1,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Depósitos
CREATE TABLE IF NOT EXISTS depositos (
  id_deposito SERIAL PRIMARY KEY,
  nombre_deposito VARCHAR(200) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Productos
CREATE TABLE IF NOT EXISTS productos (
  id_producto SERIAL PRIMARY KEY,
  id_categoria_producto INTEGER REFERENCES categorias(id_categoria),
  codigo_producto VARCHAR(200) NOT NULL UNIQUE,
  nombre_producto VARCHAR(200) NOT NULL,
  min_cilindrico REAL DEFAULT 0,
  max_cilindrico REAL DEFAULT 0,
  min_esferico REAL DEFAULT 0,
  max_esferico REAL DEFAULT 0,
  costo_producto REAL NOT NULL,
  precio_producto REAL NOT NULL,
  preciom_producto REAL NOT NULL,
  iva_producto REAL DEFAULT 0,
  tipo_producto INTEGER DEFAULT 1,
  base_min INTEGER DEFAULT 0,
  base_max REAL DEFAULT 0,
  adicion_min REAL DEFAULT 0,
  adicion_max REAL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Productos por depósito (stock)
CREATE TABLE IF NOT EXISTS productos_depositos (
  id_productos_deposito SERIAL PRIMARY KEY,
  deposito_id INTEGER REFERENCES depositos(id_deposito),
  producto_id INTEGER NOT NULL REFERENCES productos(id_producto),
  stock_producto_deposito REAL NOT NULL,
  graduacion_esferico REAL DEFAULT 0,
  graduacion_cilindrico REAL DEFAULT 0,
  eje INTEGER DEFAULT 0,
  adicion REAL DEFAULT 0,
  base REAL DEFAULT 1,
  lado INTEGER DEFAULT 1,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Productos movimientos
CREATE TABLE IF NOT EXISTS productos_movimientos (
  id_productos_movimiento BIGSERIAL PRIMARY KEY,
  user_id_mov INTEGER NOT NULL,
  producto_id_mov INTEGER NOT NULL,
  cantidad_mov REAL NOT NULL,
  tipo_mov INTEGER NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Productos registros
CREATE TABLE IF NOT EXISTS productos_registros (
  id_productos_registro SERIAL PRIMARY KEY,
  id_producto_registro INTEGER NOT NULL,
  id_deposito_registro INTEGER NOT NULL,
  cantidad_cargada REAL,
  fecha_cargada DATE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Productos vendidos
CREATE TABLE IF NOT EXISTS productos_vendidos (
  id_productos_vendido INTEGER,
  producto_id INTEGER NOT NULL,
  cantidad_vendido INTEGER NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Clientes
CREATE TABLE IF NOT EXISTS clientes (
  id_cliente SERIAL PRIMARY KEY,
  ruc_cliente VARCHAR(100),
  nombre_cliente VARCHAR(200) NOT NULL,
  fantasia_cliente VARCHAR(200),
  telefono_cliente VARCHAR(150),
  email_cliente VARCHAR(150),
  ciudad_cliente VARCHAR(150),
  direccion_cliente TEXT,
  nacimiento_cliente DATE,
  tipo_cliente INTEGER DEFAULT 3,
  tipo_pago INTEGER DEFAULT 1,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Proveedores
CREATE TABLE IF NOT EXISTS proveedors (
  id_proveedor SERIAL PRIMARY KEY,
  ruc_proveedor VARCHAR(20),
  nombre_proveedor VARCHAR(100) NOT NULL,
  telefono_proveedor VARCHAR(100) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Empleados
CREATE TABLE IF NOT EXISTS empleados (
  id_empleado SERIAL PRIMARY KEY,
  id_user_empleado INTEGER,
  doc_empleado VARCHAR(30) NOT NULL UNIQUE,
  nombre_empleado VARCHAR(200) NOT NULL,
  telefono_empleado VARCHAR(30) NOT NULL,
  tipo_empleado INTEGER DEFAULT 1,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Permisos
CREATE TABLE IF NOT EXISTS permisos (
  id_permiso SERIAL PRIMARY KEY,
  clave_permiso VARCHAR(50) NOT NULL,
  descripcion_permiso VARCHAR(150) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Permisos de usuarios
CREATE TABLE IF NOT EXISTS permisos_users (
  id_permisos_user SERIAL PRIMARY KEY,
  id_user_permiso UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  id_permiso_permiso INTEGER NOT NULL REFERENCES permisos(id_permiso),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(id_user_permiso, id_permiso_permiso)
);

-- Monedas
CREATE TABLE IF NOT EXISTS monedas (
  id_moneda SERIAL PRIMARY KEY,
  abreviatura_moneda VARCHAR(10) NOT NULL,
  nombre_moneda VARCHAR(50) NOT NULL,
  valor_moneda INTEGER NOT NULL,
  activo_moneda INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pedidos
CREATE TABLE IF NOT EXISTS pedidos (
  id_pedido SERIAL PRIMARY KEY,
  factura_id INTEGER DEFAULT 0,
  nro_factura_pedido VARCHAR(200) DEFAULT '0',
  cliente_id_pedido INTEGER NOT NULL,
  user_id_pedido UUID NOT NULL REFERENCES profiles(id),
  armazon_id INTEGER DEFAULT 0,
  fecha_pedido TIMESTAMPTZ NOT NULL,
  obs_laboratorio TEXT,
  codigo_cliente_pedido VARCHAR(200) DEFAULT '0',
  obs_cliente TEXT,
  total_pedido REAL NOT NULL,
  total_iva10 REAL NOT NULL,
  total_iva5 REAL NOT NULL,
  total_exenta REAL NOT NULL,
  estado_pedido INTEGER DEFAULT 1,
  facturado_pedido INTEGER DEFAULT 0,
  estado_pago INTEGER DEFAULT 0,
  tipo_pedido INTEGER DEFAULT 1,
  motivo_cancela TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pedidos items
CREATE TABLE IF NOT EXISTS pedidos_items (
  id_pedidos_item SERIAL PRIMARY KEY,
  lado_item INTEGER DEFAULT 0,
  pedido_id INTEGER NOT NULL REFERENCES pedidos(id_pedido),
  producto_id_item INTEGER NOT NULL REFERENCES productos(id_producto),
  deposito_id_item INTEGER DEFAULT 0,
  precio_venta_item REAL NOT NULL,
  cantidad_pedido REAL NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pedidos registros
CREATE TABLE IF NOT EXISTS pedidos_registros (
  id_pedidos_registro SERIAL PRIMARY KEY,
  pedido_id INTEGER NOT NULL REFERENCES pedidos(id_pedido),
  user_id UUID NOT NULL REFERENCES profiles(id),
  actividad VARCHAR(200) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recetas
CREATE TABLE IF NOT EXISTS recetas (
  id_receta SERIAL PRIMARY KEY,
  codigo_derecho VARCHAR(255) DEFAULT '0',
  codigo_izquierdo VARCHAR(255) DEFAULT '0',
  pedido_id_receta INTEGER NOT NULL REFERENCES pedidos(id_pedido),
  adicion_derecho REAL DEFAULT 0,
  adicion_izquierdo REAL DEFAULT 0,
  cerca_derecho_cilindrico REAL DEFAULT 0,
  cerca_derecho_esferico REAL DEFAULT 0,
  cerca_eje_derecho REAL DEFAULT 0,
  cerca_eje_izquierdo REAL DEFAULT 0,
  cerca_izquierdo_cilindrico REAL DEFAULT 0,
  cerca_izquierdo_esferico REAL DEFAULT 0,
  lejos_derecho_cilindrico REAL DEFAULT 0,
  lejos_derecho_esferico REAL DEFAULT 0,
  lejos_eje_derecho REAL DEFAULT 0,
  lejos_eje_izquierdo REAL DEFAULT 0,
  lejos_izquierdo_cilindrico REAL DEFAULT 0,
  lejos_izquierdo_esferico REAL DEFAULT 0,
  dnp_izquierdo REAL DEFAULT 30,
  dnp_derecho REAL DEFAULT 30,
  altura_izquierdo REAL DEFAULT 15,
  altura_derecho REAL DEFAULT 15,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Facturas
CREATE TABLE IF NOT EXISTS facturas (
  id_factura SERIAL PRIMARY KEY,
  cliente_id INTEGER NOT NULL REFERENCES clientes(id_cliente),
  user_id UUID NOT NULL REFERENCES profiles(id),
  nro_factura VARCHAR(100) NOT NULL,
  nros_pedidos TEXT,
  tipo_factura INTEGER NOT NULL,
  total_exenta REAL NOT NULL,
  total_iva5 REAL NOT NULL,
  total_iva10 REAL NOT NULL,
  total_factura REAL NOT NULL,
  factura_pagado INTEGER DEFAULT 1,
  fecha_factura TIMESTAMPTZ NOT NULL,
  estado_factura INTEGER DEFAULT 1,
  tipo_pago INTEGER DEFAULT 1,
  fecha_cobro_factura DATE NOT NULL,
  motivo_cancela TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Facturas items
CREATE TABLE IF NOT EXISTS facturas_items (
  id_facturas_item SERIAL PRIMARY KEY,
  factura_id INTEGER NOT NULL REFERENCES facturas(id_factura),
  producto_id INTEGER NOT NULL REFERENCES productos(id_producto),
  cantidad_item REAL NOT NULL,
  precio_item REAL NOT NULL,
  iva_item INTEGER NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recibos
CREATE TABLE IF NOT EXISTS recibos (
  id_recibo SERIAL PRIMARY KEY,
  cliente_id_recibo INTEGER NOT NULL REFERENCES clientes(id_cliente),
  nro_recibo INTEGER NOT NULL,
  total_recibo REAL NOT NULL,
  efectivo_recibo REAL DEFAULT 0,
  transferencia_recibo REAL DEFAULT 0,
  cheque_recibo REAL DEFAULT 0,
  cheque_nro_recibo VARCHAR(200) DEFAULT '0',
  banco_recibo VARCHAR(200) DEFAULT 'x',
  fecha_recibo DATE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recibos items
CREATE TABLE IF NOT EXISTS recibos_items (
  id_recibos_item SERIAL PRIMARY KEY,
  recibo_id INTEGER NOT NULL REFERENCES recibos(id_recibo),
  factura_id_recibo REAL NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recibo pedidos
CREATE TABLE IF NOT EXISTS recibo_pedidos (
  id_recibo_pedido SERIAL PRIMARY KEY,
  generado_por UUID NOT NULL REFERENCES profiles(id),
  nros_pedidos TEXT NOT NULL,
  cliente_id_recibo INTEGER NOT NULL REFERENCES clientes(id_cliente),
  fecha_recibo TIMESTAMPTZ DEFAULT NOW(),
  total_recibo REAL NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recibo pedidos items
CREATE TABLE IF NOT EXISTS recibo_pedidos_items (
  id_recibo_pedidos_item SERIAL PRIMARY KEY,
  recibo_pedido_id INTEGER NOT NULL REFERENCES recibo_pedidos(id_recibo_pedido),
  pedido_id_recibo INTEGER NOT NULL,
  total_item_recibo REAL NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Descuentos
CREATE TABLE IF NOT EXISTS descuentos (
  id_descuento SERIAL PRIMARY KEY,
  cliente_id_descuento INTEGER NOT NULL REFERENCES clientes(id_cliente),
  producto_id_descuento INTEGER NOT NULL REFERENCES productos(id_producto),
  porcentaje_descuento REAL NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pagar (cuentas por pagar)
CREATE TABLE IF NOT EXISTS pagars (
  id_pagar SERIAL PRIMARY KEY,
  tipo_pagar INTEGER NOT NULL,
  estado_pagar INTEGER DEFAULT 0,
  forma_pagar INTEGER NOT NULL,
  vencimiento_pagar DATE NOT NULL,
  fecha_pagar DATE NOT NULL,
  detalles_pagar TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Usuarios registros (log de login)
CREATE TABLE IF NOT EXISTS users_registros (
  id_users_registro BIGSERIAL PRIMARY KEY,
  id_user_registro UUID NOT NULL REFERENCES profiles(id),
  fecha_login TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ÍNDICES PARA RENDIMIENTO
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_productos_categoria ON productos(id_categoria_producto);
CREATE INDEX IF NOT EXISTS idx_productos_codigo ON productos(codigo_producto);
CREATE INDEX IF NOT EXISTS idx_productos_depositos_producto ON productos_depositos(producto_id);
CREATE INDEX IF NOT EXISTS idx_productos_depositos_deposito ON productos_depositos(deposito_id);
CREATE INDEX IF NOT EXISTS idx_pedidos_cliente ON pedidos(cliente_id_pedido);
CREATE INDEX IF NOT EXISTS idx_pedidos_user ON pedidos(user_id_pedido);
CREATE INDEX IF NOT EXISTS idx_pedidos_fecha ON pedidos(fecha_pedido);
CREATE INDEX IF NOT EXISTS idx_pedidos_items_pedido ON pedidos_items(pedido_id);
CREATE INDEX IF NOT EXISTS idx_facturas_cliente ON facturas(cliente_id);
CREATE INDEX IF NOT EXISTS idx_facturas_user ON facturas(user_id);
CREATE INDEX IF NOT EXISTS idx_facturas_fecha ON facturas(fecha_factura);
CREATE INDEX IF NOT EXISTS idx_facturas_items_factura ON facturas_items(factura_id);
CREATE INDEX IF NOT EXISTS idx_recibos_cliente ON recibos(cliente_id_recibo);
CREATE INDEX IF NOT EXISTS idx_permisos_users_user ON permisos_users(id_user_permiso);
CREATE INDEX IF NOT EXISTS idx_recetas_pedido ON recetas(pedido_id_receta);

-- =====================================================
-- FUNCIONES Y TRIGGERS
-- =====================================================

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualizar updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_empresas_updated_at BEFORE UPDATE ON empresas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categorias_updated_at BEFORE UPDATE ON categorias FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_depositos_updated_at BEFORE UPDATE ON depositos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_productos_updated_at BEFORE UPDATE ON productos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_clientes_updated_at BEFORE UPDATE ON clientes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pedidos_updated_at BEFORE UPDATE ON pedidos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_facturas_updated_at BEFORE UPDATE ON facturas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
