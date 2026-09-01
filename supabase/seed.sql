-- =====================================================
-- SAETA ZOOM - Datos iniciales (Seed)
-- =====================================================

-- Insertar permisos
INSERT INTO permisos (clave_permiso, descripcion_permiso) VALUES
  ('dashboard', 'Ver Dashboard'),
  ('clientes_ver', 'Ver Clientes'),
  ('clientes_agregar', 'Agregar Clientes'),
  ('clientes_editar', 'Editar Clientes'),
  ('clientes_eliminar', 'Eliminar Clientes'),
  ('productos_ver', 'Ver Productos'),
  ('productos_agregar', 'Agregar Productos'),
  ('productos_editar', 'Editar Productos'),
  ('productos_eliminar', 'Eliminar Productos'),
  ('inventario_ver', 'Ver Inventario'),
  ('inventario_editar', 'Editar Inventario'),
  ('categorias_ver', 'Ver Categorías'),
  ('categorias_editar', 'Editar Categorías'),
  ('depositos_ver', 'Ver Depósitos'),
  ('depositos_editar', 'Editar Depósitos'),
  ('pedidos_ver', 'Ver Pedidos'),
  ('pedidos_agregar', 'Agregar Pedidos'),
  ('pedidos_editar', 'Editar Pedidos'),
  ('pedidos_cancelar', 'Cancelar Pedidos'),
  ('facturas_ver', 'Ver Facturas'),
  ('facturas_agregar', 'Agregar Facturas'),
  ('facturas_anular', 'Anular Facturas'),
  ('recibos_ver', 'Ver Recibos'),
  ('recibos_agregar', 'Agregar Recibos'),
  ('descuentos_ver', 'Ver Descuentos'),
  ('descuentos_editar', 'Editar Descuentos'),
  ('empleados_ver', 'Ver Empleados'),
  ('empleados_editar', 'Editar Empleados'),
  ('proveedores_ver', 'Ver Proveedores'),
  ('proveedores_editar', 'Editar Proveedores'),
  ('usuarios_ver', 'Ver Usuarios'),
  ('usuarios_editar', 'Editar Usuarios'),
  ('empresa_ver', 'Ver Empresa'),
  ('empresa_editar', 'Editar Empresa'),
  ('reportes_ver', 'Ver Reportes'),
  ('reportes_ventas', 'Reporte de Ventas'),
  ('recibos_pedido_ver', 'Ver Recibos de Pedidos'),
  ('recibos_pedido_agregar', 'Agregar Recibos de Pedidos'),
  ('financiero_ver', 'Ver Financiero'),
  ('financiero_recibos', 'Recibos Financieros'),
  ('financiero_aciertos', 'Aciertos Financieros'),
  ('perfil_ver', 'Ver Perfil'),
  ('perfil_editar', 'Editar Perfil')
ON CONFLICT (clave_permiso) DO NOTHING;

-- Insertar empresa por defecto
INSERT INTO empresas (
  nombre_empresa, propietario_empresa, ruc_empresa, direccion_empresa,
  telefono_empresa, impuesto_empresa, categoria_empresa, dimension_ticket,
  licencia, tipo_papel, mensaje_recibo_empresa, cuota_empresa, configurado
) VALUES (
  'ZOOM OPTICAL', 'Propietario', '123456789-0', 'Asunción, Paraguay',
  '021-123456', 'IVA', 'Óptica', 80,
  '2027-12-31', 1, '¡Gracias por su compra!', 0, 1
);

-- Insertar monedas
INSERT INTO monedas (abreviatura_moneda, nombre_moneda, valor_moneda, activo_moneda) VALUES
  ('Gs.', 'Guaraníes', 1, 1),
  ('USD', 'Dólares', 7000, 0);

-- Insertar categorías iniciales
INSERT INTO categorias (nombre_categoria, tipo_categoria) VALUES
  ('Lentes de Contacto', 1),
  ('Monturas', 1),
  ('Lentes Oftálmicos', 1),
  ('Lentes de Sol', 1),
  ('Accesorios', 1),
  ('Servicios', 2)
ON CONFLICT DO NOTHING;

-- Insertar depósitos iniciales
INSERT INTO depositos (nombre_deposito) VALUES
  ('Depósito Principal'),
  ('Depósito Secundario')
ON CONFLICT DO NOTHING;

-- =====================================================
-- NOTA: El usuario administrador se crea desde la
-- interfaz de Supabase Auth o con un script separado.
-- Ejemplo:
-- INSERT INTO auth.users (email, password, email_confirmed_at)
-- VALUES ('admin@zoom.com', crypt('admin123', gen_salt('bf')), NOW());
--
-- Luego insertar el perfil:
-- INSERT INTO profiles (id, nombre, username, rol, estado)
-- VALUES (
--   (SELECT id FROM auth.users WHERE email = 'admin@zoom.com'),
--   'Administrador', 'admin', 1, 1
-- );
-- =====================================================
