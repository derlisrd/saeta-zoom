-- =====================================================
-- SAETA ZOOM - Row Level Security Policies
-- =====================================================

-- Habilitar RLS en todas las tablas
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
-- POLÍTICAS PERMISIVAS (desarrollo)
-- En producción, reemplazar con políticas más restrictivas
-- =====================================================

-- Profiles: usuario puede ver su propio perfil, admin ve todos
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admin can do everything on profiles" ON profiles
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND rol = 1)
  );

-- Empresas: cualquier usuario autenticado puede ver
CREATE POLICY "Authenticated users can view empresas" ON empresas
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can manage empresas" ON empresas
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND rol = 1)
  );

-- Categorías: lectura para todos autenticados, escritura para admin
CREATE POLICY "Authenticated users can view categorias" ON categorias
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can manage categorias" ON categorias
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND rol = 1)
  );

-- Depósitos: lectura para todos autenticados, escritura para admin
CREATE POLICY "Authenticated users can view depositos" ON depositos
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can manage depositos" ON depositos
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND rol = 1)
  );

-- Productos: lectura para todos autenticados, escritura para admin
CREATE POLICY "Authenticated users can view productos" ON productos
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can manage productos" ON productos
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND rol = 1)
  );

-- Productos depósitos: lectura para todos, escritura para admin
CREATE POLICY "Authenticated users can view productos_depositos" ON productos_depositos
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can manage productos_depositos" ON productos_depositos
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND rol = 1)
  );

-- Productos movimientos: lectura para todos, inserción para admin
CREATE POLICY "Authenticated users can view productos_movimientos" ON productos_movimientos
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can insert productos_movimientos" ON productos_movimientos
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND rol = 1)
  );

-- Clientes: lectura para todos autenticados, escritura para admin
CREATE POLICY "Authenticated users can view clientes" ON clientes
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can manage clientes" ON clientes
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND rol = 1)
  );

-- Proveedores: lectura para todos, escritura para admin
CREATE POLICY "Authenticated users can view proveedors" ON proveedors
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can manage proveedors" ON proveedors
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND rol = 1)
  );

-- Empleados: lectura para todos, escritura para admin
CREATE POLICY "Authenticated users can view empleados" ON empleados
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can manage empleados" ON empleados
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND rol = 1)
  );

-- Permisos: lectura para todos, escritura para admin
CREATE POLICY "Authenticated users can view permisos" ON permisos
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can manage permisos" ON permisos
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND rol = 1)
  );

-- Permisos users: lectura para todos, escritura para admin
CREATE POLICY "Authenticated users can view permisos_users" ON permisos_users
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can manage permisos_users" ON permisos_users
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND rol = 1)
  );

-- Monedas: lectura para todos, escritura para admin
CREATE POLICY "Authenticated users can view monedas" ON monedas
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can manage monedas" ON monedas
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND rol = 1)
  );

-- Pedidos: usuario ve los suyos, admin ve todos
CREATE POLICY "Users can view own pedidos" ON pedidos
  FOR SELECT USING (
    auth.uid() = user_id_pedido OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND rol = 1)
  );

CREATE POLICY "Authenticated users can insert pedidos" ON pedidos
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update own pedidos" ON pedidos
  FOR UPDATE USING (
    auth.uid() = user_id_pedido OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND rol = 1)
  );

-- Pedidos items: vinculados a pedidos del usuario
CREATE POLICY "Users can view pedidos_items via pedido" ON pedidos_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM pedidos
      WHERE pedidos.id_pedido = pedidos_items.pedido_id
      AND (pedidos.user_id_pedido = auth.uid() OR
           EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND rol = 1))
    )
  );

CREATE POLICY "Authenticated users can insert pedidos_items" ON pedidos_items
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Pedidos registros: lectura para todos autenticados
CREATE POLICY "Authenticated users can view pedidos_registros" ON pedidos_registros
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert pedidos_registros" ON pedidos_registros
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Recetas: vinculadas a pedidos del usuario
CREATE POLICY "Users can view recetas via pedido" ON recetas
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM pedidos
      WHERE pedidos.id_pedido = recetas.pedido_id_receta
      AND (pedidos.user_id_pedido = auth.uid() OR
           EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND rol = 1))
    )
  );

CREATE POLICY "Authenticated users can insert recetas" ON recetas
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update recetas" ON recetas
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Facturas: usuario ve las suyas, admin ve todas
CREATE POLICY "Users can view facturas" ON facturas
  FOR SELECT USING (
    auth.uid() = user_id OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND rol = 1)
  );

CREATE POLICY "Authenticated users can insert facturas" ON facturas
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin can update facturas" ON facturas
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND rol = 1)
  );

-- Facturas items: lectura para todos autenticados
CREATE POLICY "Authenticated users can view facturas_items" ON facturas_items
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert facturas_items" ON facturas_items
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Recibos: lectura para todos autenticados
CREATE POLICY "Authenticated users can view recibos" ON recibos
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert recibos" ON recibos
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Recibos items: lectura para todos autenticados
CREATE POLICY "Authenticated users can view recibos_items" ON recibos_items
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert recibos_items" ON recibos_items
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Recibo pedidos: lectura para todos autenticados
CREATE POLICY "Authenticated users can view recibo_pedidos" ON recibo_pedidos
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert recibo_pedidos" ON recibo_pedidos
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Recibo pedidos items: lectura para todos autenticados
CREATE POLICY "Authenticated users can view recibo_pedidos_items" ON recibo_pedidos_items
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert recibo_pedidos_items" ON recibo_pedidos_items
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Descuentos: lectura para todos, escritura para admin
CREATE POLICY "Authenticated users can view descuentos" ON descuentos
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can manage descuentos" ON descuentos
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND rol = 1)
  );

-- Pagar: lectura para todos, escritura para admin
CREATE POLICY "Authenticated users can view pagars" ON pagars
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can manage pagars" ON pagars
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND rol = 1)
  );

-- Users registros: lectura para admin
CREATE POLICY "Admin can view users_registros" ON users_registros
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND rol = 1)
  );

CREATE POLICY "Authenticated users can insert users_registros" ON users_registros
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Productos registros: lectura para admin
CREATE POLICY "Authenticated users can view productos_registros" ON productos_registros
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can manage productos_registros" ON productos_registros
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND rol = 1)
  );

-- Productos vendidos: lectura para admin
CREATE POLICY "Authenticated users can view productos_vendidos" ON productos_vendidos
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can manage productos_vendidos" ON productos_vendidos
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND rol = 1)
  );
