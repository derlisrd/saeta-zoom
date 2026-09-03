-- =====================================================
-- SAETA ZOOM - Row Level Security Policies
-- =====================================================

-- =====================================================
-- FUNCIÓN AUXILIAR (evita recursión en profiles)
-- =====================================================
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS integer AS $$
  SELECT rol FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- =====================================================
-- HABILITAR RLS EN TODAS LAS TABLAS
-- =====================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE empresas ENABLE ROW LEVEL SECURITY;
ALTER TABLE categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE depositos ENABLE ROW LEVEL SECURITY;
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;
ALTER TABLE productos_depositos ENABLE ROW LEVEL SECURITY;
ALTER TABLE productos_movimientos ENABLE ROW LEVEL SECURITY;
ALTER TABLE productos_registros ENABLE ROW LEVEL SECURITY;
ALTER TABLE productos_vendidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE proveedors ENABLE ROW LEVEL SECURITY;
ALTER TABLE empleados ENABLE ROW LEVEL SECURITY;
ALTER TABLE permisos ENABLE ROW LEVEL SECURITY;
ALTER TABLE permisos_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE monedas ENABLE ROW LEVEL SECURITY;
ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE pedidos_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE pedidos_registros ENABLE ROW LEVEL SECURITY;
ALTER TABLE recetas ENABLE ROW LEVEL SECURITY;
ALTER TABLE facturas ENABLE ROW LEVEL SECURITY;
ALTER TABLE facturas_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE recibos ENABLE ROW LEVEL SECURITY;
ALTER TABLE recibos_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE recibo_pedidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE recibo_pedidos_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE descuentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE pagars ENABLE ROW LEVEL SECURITY;
ALTER TABLE users_registros ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- ELIMINAR POLÍTICAS EXISTENTES (si se re-ejecuta)
-- =====================================================
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admin can do everything on profiles" ON profiles;
DROP POLICY IF EXISTS "Authenticated users can view empresas" ON empresas;
DROP POLICY IF EXISTS "Admin can manage empresas" ON empresas;
DROP POLICY IF EXISTS "Authenticated users can view categorias" ON categorias;
DROP POLICY IF EXISTS "Admin can manage categorias" ON categorias;
DROP POLICY IF EXISTS "Authenticated users can view depositos" ON depositos;
DROP POLICY IF EXISTS "Admin can manage depositos" ON depositos;
DROP POLICY IF EXISTS "Authenticated users can view productos" ON productos;
DROP POLICY IF EXISTS "Admin can manage productos" ON productos;
DROP POLICY IF EXISTS "Authenticated users can view productos_depositos" ON productos_depositos;
DROP POLICY IF EXISTS "Admin can manage productos_depositos" ON productos_depositos;
DROP POLICY IF EXISTS "Authenticated users can view productos_movimientos" ON productos_movimientos;
DROP POLICY IF EXISTS "Admin can insert productos_movimientos" ON productos_movimientos;
DROP POLICY IF EXISTS "Authenticated users can view clientes" ON clientes;
DROP POLICY IF EXISTS "Admin can manage clientes" ON clientes;
DROP POLICY IF EXISTS "Authenticated users can view proveedors" ON proveedors;
DROP POLICY IF EXISTS "Admin can manage proveedors" ON proveedors;
DROP POLICY IF EXISTS "Authenticated users can view empleados" ON empleados;
DROP POLICY IF EXISTS "Admin can manage empleados" ON empleados;
DROP POLICY IF EXISTS "Authenticated users can view permisos" ON permisos;
DROP POLICY IF EXISTS "Admin can manage permisos" ON permisos;
DROP POLICY IF EXISTS "Authenticated users can view permisos_users" ON permisos_users;
DROP POLICY IF EXISTS "Admin can manage permisos_users" ON permisos_users;
DROP POLICY IF EXISTS "Authenticated users can view monedas" ON monedas;
DROP POLICY IF EXISTS "Admin can manage monedas" ON monedas;
DROP POLICY IF EXISTS "Users can view own pedidos" ON pedidos;
DROP POLICY IF EXISTS "Authenticated users can insert pedidos" ON pedidos;
DROP POLICY IF EXISTS "Users can update own pedidos" ON pedidos;
DROP POLICY IF EXISTS "Users can view pedidos_items via pedido" ON pedidos_items;
DROP POLICY IF EXISTS "Authenticated users can insert pedidos_items" ON pedidos_items;
DROP POLICY IF EXISTS "Authenticated users can view pedidos_registros" ON pedidos_registros;
DROP POLICY IF EXISTS "Authenticated users can insert pedidos_registros" ON pedidos_registros;
DROP POLICY IF EXISTS "Users can view recetas via pedido" ON recetas;
DROP POLICY IF EXISTS "Authenticated users can insert recetas" ON recetas;
DROP POLICY IF EXISTS "Authenticated users can update recetas" ON recetas;
DROP POLICY IF EXISTS "Users can view facturas" ON facturas;
DROP POLICY IF EXISTS "Authenticated users can insert facturas" ON facturas;
DROP POLICY IF EXISTS "Admin can update facturas" ON facturas;
DROP POLICY IF EXISTS "Authenticated users can view facturas_items" ON facturas_items;
DROP POLICY IF EXISTS "Authenticated users can insert facturas_items" ON facturas_items;
DROP POLICY IF EXISTS "Authenticated users can view recibos" ON recibos;
DROP POLICY IF EXISTS "Authenticated users can insert recibos" ON recibos;
DROP POLICY IF EXISTS "Authenticated users can view recibos_items" ON recibos_items;
DROP POLICY IF EXISTS "Authenticated users can insert recibos_items" ON recibos_items;
DROP POLICY IF EXISTS "Authenticated users can view recibo_pedidos" ON recibo_pedidos;
DROP POLICY IF EXISTS "Authenticated users can insert recibo_pedidos" ON recibo_pedidos;
DROP POLICY IF EXISTS "Authenticated users can view recibo_pedidos_items" ON recibo_pedidos_items;
DROP POLICY IF EXISTS "Authenticated users can insert recibo_pedidos_items" ON recibo_pedidos_items;
DROP POLICY IF EXISTS "Authenticated users can view descuentos" ON descuentos;
DROP POLICY IF EXISTS "Admin can manage descuentos" ON descuentos;
DROP POLICY IF EXISTS "Authenticated users can view pagars" ON pagars;
DROP POLICY IF EXISTS "Admin can manage pagars" ON pagars;
DROP POLICY IF EXISTS "Admin can view users_registros" ON users_registros;
DROP POLICY IF EXISTS "Authenticated users can insert users_registros" ON users_registros;
DROP POLICY IF EXISTS "Authenticated users can view productos_registros" ON productos_registros;
DROP POLICY IF EXISTS "Admin can manage productos_registros" ON productos_registros;
DROP POLICY IF EXISTS "Authenticated users can view productos_vendidos" ON productos_vendidos;
DROP POLICY IF EXISTS "Admin can manage productos_vendidos" ON productos_vendidos;

-- =====================================================
-- POLÍTICAS - PROFILES (sin recursión)
-- =====================================================

-- Todos los autenticados pueden ver su propio perfil
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Usuarios pueden actualizar su propio perfil
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Admin puede ver todos los perfiles (usa función SECURITY DEFINER)
CREATE POLICY "Admin can view all profiles" ON profiles
  FOR SELECT USING (get_user_role() = 1);

-- Admin puede insertar perfiles
CREATE POLICY "Admin can insert profiles" ON profiles
  FOR INSERT WITH CHECK (get_user_role() = 1);

-- Admin puede actualizar cualquier perfil
CREATE POLICY "Admin can update any profile" ON profiles
  FOR UPDATE USING (get_user_role() = 1);

-- Admin puede eliminar perfiles
CREATE POLICY "Admin can delete profiles" ON profiles
  FOR DELETE USING (get_user_role() = 1);

-- =====================================================
-- POLÍTICAS - TABLAS DE NEGOCIO
-- =====================================================

-- Empresas
CREATE POLICY "Authenticated users can view empresas" ON empresas
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can manage empresas" ON empresas
  FOR ALL USING (get_user_role() = 1);

-- Categorías
CREATE POLICY "Authenticated users can view categorias" ON categorias
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can manage categorias" ON categorias
  FOR ALL USING (get_user_role() = 1);

-- Depósitos
CREATE POLICY "Authenticated users can view depositos" ON depositos
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can manage depositos" ON depositos
  FOR ALL USING (get_user_role() = 1);

-- Productos
CREATE POLICY "Authenticated users can view productos" ON productos
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can manage productos" ON productos
  FOR ALL USING (get_user_role() = 1);

-- Productos depósitos
CREATE POLICY "Authenticated users can view productos_depositos" ON productos_depositos
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can manage productos_depositos" ON productos_depositos
  FOR ALL USING (get_user_role() = 1);

-- Productos movimientos
CREATE POLICY "Authenticated users can view productos_movimientos" ON productos_movimientos
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert productos_movimientos" ON productos_movimientos
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Clientes
CREATE POLICY "Authenticated users can view clientes" ON clientes
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can manage clientes" ON clientes
  FOR ALL USING (get_user_role() = 1);

-- Proveedores
CREATE POLICY "Authenticated users can view proveedors" ON proveedors
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can manage proveedors" ON proveedors
  FOR ALL USING (get_user_role() = 1);

-- Empleados
CREATE POLICY "Authenticated users can view empleados" ON empleados
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can manage empleados" ON empleados
  FOR ALL USING (get_user_role() = 1);

-- Permisos
CREATE POLICY "Authenticated users can view permisos" ON permisos
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can manage permisos" ON permisos
  FOR ALL USING (get_user_role() = 1);

-- Permisos users
CREATE POLICY "Authenticated users can view permisos_users" ON permisos_users
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can manage permisos_users" ON permisos_users
  FOR ALL USING (get_user_role() = 1);

-- Monedas
CREATE POLICY "Authenticated users can view monedas" ON monedas
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can manage monedas" ON monedas
  FOR ALL USING (get_user_role() = 1);

-- Pedidos
CREATE POLICY "Authenticated users can view pedidos" ON pedidos
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert pedidos" ON pedidos
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update pedidos" ON pedidos
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Pedidos items
CREATE POLICY "Authenticated users can view pedidos_items" ON pedidos_items
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert pedidos_items" ON pedidos_items
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Pedidos registros
CREATE POLICY "Authenticated users can view pedidos_registros" ON pedidos_registros
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert pedidos_registros" ON pedidos_registros
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Recetas
CREATE POLICY "Authenticated users can view recetas" ON recetas
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert recetas" ON recetas
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update recetas" ON recetas
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Facturas
CREATE POLICY "Authenticated users can view facturas" ON facturas
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert facturas" ON facturas
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update facturas" ON facturas
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Facturas items
CREATE POLICY "Authenticated users can view facturas_items" ON facturas_items
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert facturas_items" ON facturas_items
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Recibos
CREATE POLICY "Authenticated users can view recibos" ON recibos
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert recibos" ON recibos
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Recibos items
CREATE POLICY "Authenticated users can view recibos_items" ON recibos_items
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert recibos_items" ON recibos_items
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Recibo pedidos
CREATE POLICY "Authenticated users can view recibo_pedidos" ON recibo_pedidos
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert recibo_pedidos" ON recibo_pedidos
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Recibo pedidos items
CREATE POLICY "Authenticated users can view recibo_pedidos_items" ON recibo_pedidos_items
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert recibo_pedidos_items" ON recibo_pedidos_items
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Descuentos
CREATE POLICY "Authenticated users can view descuentos" ON descuentos
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can manage descuentos" ON descuentos
  FOR ALL USING (get_user_role() = 1);

-- Pagar
CREATE POLICY "Authenticated users can view pagars" ON pagars
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can manage pagars" ON pagars
  FOR ALL USING (get_user_role() = 1);

-- Users registros
CREATE POLICY "Authenticated users can view users_registros" ON users_registros
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert users_registros" ON users_registros
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Productos registros
CREATE POLICY "Authenticated users can view productos_registros" ON productos_registros
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can manage productos_registros" ON productos_registros
  FOR ALL USING (get_user_role() = 1);

-- Productos vendidos
CREATE POLICY "Authenticated users can view productos_vendidos" ON productos_vendidos
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can manage productos_vendidos" ON productos_vendidos
  FOR ALL USING (get_user_role() = 1);
