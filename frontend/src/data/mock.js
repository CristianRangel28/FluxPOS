// Datos de ejemplo para los mockups de FluxPOS.
// Reflejan las tablas de /database/scripts. Se reemplazarán por llamadas a la API (src/services/api.js).

export const money = (n) => '$ ' + Number(n).toLocaleString('es-CO')

export const categories = [
  { id: 1, name: 'Bebidas', description: 'Gaseosas, jugos y agua' },
  { id: 2, name: 'Snacks', description: 'Papas, galletas y dulces' },
  { id: 3, name: 'Lácteos', description: 'Leche, queso y yogur' },
  { id: 4, name: 'Aseo', description: 'Limpieza del hogar y cuidado personal' },
  { id: 5, name: 'Granos', description: 'Arroz, lentejas y cereales' },
]

// stock = inventory.quantity, min = stock mínimo sugerido (solo informativo en el mockup)
export const products = [
  { id: 1, name: 'Gaseosa cola 1.5 L', category: 'Bebidas', cost: 3200, price: 4500, stock: 84, min: 20 },
  { id: 2, name: 'Agua mineral 600 ml', category: 'Bebidas', cost: 900, price: 1800, stock: 12, min: 30 },
  { id: 3, name: 'Jugo de naranja 1 L', category: 'Bebidas', cost: 3800, price: 5600, stock: 41, min: 15 },
  { id: 4, name: 'Papas fritas 120 g', category: 'Snacks', cost: 2100, price: 3500, stock: 63, min: 20 },
  { id: 5, name: 'Galletas de vainilla', category: 'Snacks', cost: 1500, price: 2600, stock: 0, min: 25 },
  { id: 6, name: 'Chocolatina almendras', category: 'Snacks', cost: 1900, price: 3200, stock: 97, min: 30 },
  { id: 7, name: 'Leche entera 1 L', category: 'Lácteos', cost: 3300, price: 4400, stock: 58, min: 25 },
  { id: 8, name: 'Yogur de fresa 200 g', category: 'Lácteos', cost: 1700, price: 2800, stock: 9, min: 15 },
  { id: 9, name: 'Queso campesino 500 g', category: 'Lácteos', cost: 9800, price: 13500, stock: 22, min: 10 },
  { id: 10, name: 'Detergente en polvo 1 kg', category: 'Aseo', cost: 8600, price: 12900, stock: 35, min: 12 },
  { id: 11, name: 'Jabón de manos 250 ml', category: 'Aseo', cost: 4200, price: 6800, stock: 6, min: 10 },
  { id: 12, name: 'Arroz blanco 1 kg', category: 'Granos', cost: 3600, price: 4900, stock: 120, min: 40 },
  { id: 13, name: 'Lentejas 500 g', category: 'Granos', cost: 2900, price: 4200, stock: 47, min: 20 },
]

export function stockStatus(p) {
  if (p.stock === 0) return { label: 'Agotado', tone: 'danger' }
  if (p.stock <= p.min) return { label: 'Stock bajo', tone: 'pending' }
  return { label: 'Disponible', tone: 'done' }
}

export const customers = [
  { id: 1, name: 'Cliente general', document: '—', phone: '—', email: '—', purchases: 0, total: 0 },
  { id: 2, name: 'María Fernanda Ruiz', document: '1.020.345.678', phone: '311 456 7890', email: 'maria.ruiz@correo.com', purchases: 14, total: 1245000 },
  { id: 3, name: 'Andrés Gómez', document: '79.456.123', phone: '300 123 4567', email: 'andres.gomez@correo.com', purchases: 9, total: 683500 },
  { id: 4, name: 'Laura Rodríguez', document: '52.987.654', phone: '315 987 6543', email: 'laura.rodriguez@correo.com', purchases: 21, total: 2310000 },
  { id: 5, name: 'Carlos Méndez', document: '80.112.233', phone: '320 555 1122', email: 'carlos.mendez@correo.com', purchases: 5, total: 301000 },
  { id: 6, name: 'Valentina Pardo', document: '1.032.456.789', phone: '312 222 3344', email: 'v.pardo@correo.com', purchases: 11, total: 894200 },
]

export const suppliers = [
  { id: 1, name: 'Distribuidora La Sabana', phone: '601 345 6789', email: 'ventas@lasabana.com', address: 'Cra 68 # 12-40, Bogotá', products: 18 },
  { id: 2, name: 'Alimentos del Valle S.A.S.', phone: '602 456 1230', email: 'pedidos@alimentosvalle.co', address: 'Cl 15 # 30-22, Cali', products: 12 },
  { id: 3, name: 'Lácteos Andinos', phone: '604 321 0987', email: 'comercial@lacteosandinos.co', address: 'Av. 80 # 45-10, Medellín', products: 7 },
  { id: 4, name: 'Aseo Total Ltda.', phone: '601 765 4321', email: 'contacto@aseototal.com', address: 'Cl 13 # 65-18, Bogotá', products: 9 },
]

export const sales = [
  { number: 'VTA-1048', customer: 'María Fernanda Ruiz', seller: 'Administrador', date: '07/11/2026 10:42', items: 6, total: 185000, status: 'completed' },
  { number: 'VTA-1047', customer: 'Andrés Gómez', seller: 'Sofía Vendedora', date: '07/11/2026 10:18', items: 3, total: 92500, status: 'completed' },
  { number: 'VTA-1046', customer: 'Laura Rodríguez', seller: 'Sofía Vendedora', date: '07/11/2026 09:56', items: 9, total: 240000, status: 'completed' },
  { number: 'VTA-1045', customer: 'Carlos Méndez', seller: 'Administrador', date: '07/11/2026 09:21', items: 2, total: 67000, status: 'cancelled' },
  { number: 'VTA-1044', customer: 'Cliente general', seller: 'Sofía Vendedora', date: '06/11/2026 18:05', items: 4, total: 38400, status: 'completed' },
  { number: 'VTA-1043', customer: 'Valentina Pardo', seller: 'Administrador', date: '06/11/2026 16:40', items: 7, total: 128900, status: 'completed' },
]

export const saleDetail = {
  number: 'VTA-1048',
  payment: 'Efectivo',
  lines: [
    { product: 'Gaseosa cola 1.5 L', qty: 6, unit: 4500 },
    { product: 'Queso campesino 500 g', qty: 3, unit: 13500 },
    { product: 'Detergente en polvo 1 kg', qty: 4, unit: 12900 },
    { product: 'Arroz blanco 1 kg', qty: 10, unit: 4900 },
  ],
}

export const purchases = [
  { number: 'CMP-0215', supplier: 'Distribuidora La Sabana', date: '05/11/2026', items: 120, total: 1480000, status: 'completed' },
  { number: 'CMP-0214', supplier: 'Lácteos Andinos', date: '03/11/2026', items: 60, total: 612000, status: 'completed' },
  { number: 'CMP-0213', supplier: 'Aseo Total Ltda.', date: '31/10/2026', items: 40, total: 389500, status: 'completed' },
  { number: 'CMP-0212', supplier: 'Alimentos del Valle S.A.S.', date: '28/10/2026', items: 200, total: 2150000, status: 'completed' },
]

export const movements = [
  { date: '07/11/2026 10:42', product: 'Gaseosa cola 1.5 L', type: 'Venta', qty: -6, ref: 'VTA-1048', user: 'Administrador' },
  { date: '05/11/2026 14:10', product: 'Arroz blanco 1 kg', type: 'Compra', qty: 80, ref: 'CMP-0215', user: 'Administrador' },
  { date: '05/11/2026 14:10', product: 'Lentejas 500 g', type: 'Compra', qty: 40, ref: 'CMP-0215', user: 'Administrador' },
  { date: '04/11/2026 17:32', product: 'Yogur de fresa 200 g', type: 'Ajuste', qty: -3, ref: 'Producto vencido', user: 'Administrador' },
  { date: '03/11/2026 11:05', product: 'Leche entera 1 L', type: 'Compra', qty: 60, ref: 'CMP-0214', user: 'Administrador' },
  { date: '02/11/2026 09:48', product: 'Galletas de vainilla', type: 'Venta', qty: -25, ref: 'VTA-1031', user: 'Sofía Vendedora' },
]
