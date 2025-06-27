import { delay } from '../utils';
import {
  Tenant,
  User,
  Customer,
  Provider,
  Product,
  ProductCategory,
  Sale,
  SaleFormData,
  SaleStatus,
  PurchaseOrder,
  PurchaseOrderFormData,
  PurchaseStatus,
  InventoryMovement,
  MovementType,
} from '../types';

function createId() {
  return Math.random().toString(36).substring(2, 9);
}

const data = {
  tenants: [
    {
      id: 't1',
      name: 'Empresa Uno',
      taxId: 'AAA111',
      settings: { currency: 'USD', currencySymbol: '$', dateFormat: 'yyyy-MM-dd', taxes: 0.21 },
      users: [
        { id: 'u1', name: 'Admin Uno', email: 'admin@uno.com', role: 'Admin' },
        { id: 'u2', name: 'User Uno', email: 'user@uno.com', role: 'User' },
      ],
      customers: [],
      providers: [],
      products: [],
      categories: [],
      sales: [],
      purchases: [],
      movements: [],
    },
    {
      id: 't2',
      name: 'Empresa Dos',
      taxId: 'BBB222',
      settings: { currency: 'EUR', currencySymbol: '€', dateFormat: 'dd/MM/yyyy', taxes: 0.18 },
      users: [
        { id: 'u3', name: 'Admin Dos', email: 'admin@dos.com', role: 'Admin' },
      ],
      customers: [],
      providers: [],
      products: [],
      categories: [],
      sales: [],
      purchases: [],
      movements: [],
    },
  ] as any[],
};

type TenantData = typeof data.tenants[0];

export const api = {
  async getTenants(): Promise<Tenant[]> {
    await delay(200);
    return data.tenants.map((t) => ({
      id: t.id,
      name: t.name,
      taxId: t.taxId,
      logoUrl: t.logoUrl,
      users: t.users,
      settings: t.settings,
    }));
  },
  async getTenantById(id: string): Promise<Tenant> {
    await delay(200);
    const tenant = data.tenants.find((t) => t.id === id)!;
    return {
      id: tenant.id,
      name: tenant.name,
      taxId: tenant.taxId,
      logoUrl: tenant.logoUrl,
      users: tenant.users,
      settings: tenant.settings,
    };
  },
  async getUserById(tenantId: string, userId: string): Promise<User> {
    await delay(100);
    const tenant = data.tenants.find((t) => t.id === tenantId)!;
    return tenant.users.find((u: User) => u.id === userId)!;
  },
  async getCustomers(tenantId: string): Promise<Customer[]> {
    await delay(200);
    const tenant = data.tenants.find((t) => t.id === tenantId)!;
    return tenant.customers;
  },
  async createCustomer(tenantId: string, customer: Customer): Promise<Customer> {
    await delay(200);
    const tenant = data.tenants.find((t) => t.id === tenantId)!;
    tenant.customers.push(customer);
    return customer;
  },
  async getProducts(tenantId: string): Promise<Product[]> {
    await delay(200);
    const tenant = data.tenants.find((t) => t.id === tenantId)!;
    return tenant.products;
  },
  async createSale(tenantId: string, dataForm: SaleFormData): Promise<Sale> {
    await delay(200);
    const tenant: TenantData = data.tenants.find((t) => t.id === tenantId)!;
    const customer = tenant.customers.find((c: Customer) => c.id === dataForm.customerId)!;
    const items = dataForm.items.map((i) => {
      const product = tenant.products.find((p: Product) => p.id === i.productId)!;
      if (product.stock < i.quantity) throw new Error('Sin stock');
      product.stock -= i.quantity;
      tenant.movements.push({
        id: createId(),
        product,
        type: 'Salida',
        quantity: i.quantity,
        date: new Date().toISOString(),
        reason: 'Venta',
      });
      return { productId: product.id, productName: product.name, quantity: i.quantity, unitPrice: product.price };
    });
    const total = items.reduce((s, i) => s + i.quantity * i.unitPrice, 0);
    const sale: Sale = { id: createId(), customer, items, total, status: SaleStatus.PENDING, createdAt: new Date().toISOString() };
    tenant.sales.push(sale);
    return sale;
  },
  async updateSaleStatus(tenantId: string, saleId: string, status: SaleStatus) {
    await delay(100);
    const tenant: TenantData = data.tenants.find((t) => t.id === tenantId)!;
    const sale = tenant.sales.find((s: Sale) => s.id === saleId)!;
    sale.status = status;
  },
  async deleteSale(tenantId: string, saleId: string) {
    await delay(100);
    const tenant: TenantData = data.tenants.find((t) => t.id === tenantId)!;
    const index = tenant.sales.findIndex((s: Sale) => s.id === saleId);
    const sale = tenant.sales[index];
    sale.items.forEach((i) => {
      const product = tenant.products.find((p: Product) => p.id === i.productId)!;
      product.stock += i.quantity;
    });
    tenant.sales.splice(index, 1);
  },
  async createInventoryMovement(tenantId: string, movement: InventoryMovement) {
    await delay(100);
    const tenant: TenantData = data.tenants.find((t) => t.id === tenantId)!;
    tenant.movements.push(movement);
    const product = tenant.products.find((p: Product) => p.id === movement.product.id)!;
    if (movement.type === MovementType.IN) product.stock += movement.quantity;
    else product.stock -= movement.quantity;
  },
  async createPurchaseOrder(tenantId: string, form: PurchaseOrderFormData): Promise<PurchaseOrder> {
    await delay(200);
    const tenant: TenantData = data.tenants.find((t) => t.id === tenantId)!;
    const provider = tenant.providers.find((p: Provider) => p.id === form.providerId)!;
    const items = form.items.map((i) => {
      const product = tenant.products.find((p: Product) => p.id === i.productId)!;
      return { productId: product.id, productName: product.name, quantity: i.quantity, unitCost: i.unitCost };
    });
    const total = items.reduce((s, i) => s + i.quantity * i.unitCost, 0);
    const order: PurchaseOrder = { id: createId(), provider, items, total, status: PurchaseStatus.PENDING, createdAt: new Date().toISOString() };
    tenant.purchases.push(order);
    return order;
  },
  async updatePurchaseStatus(tenantId: string, id: string, status: PurchaseStatus) {
    await delay(100);
    const tenant: TenantData = data.tenants.find((t) => t.id === tenantId)!;
    const order = tenant.purchases.find((p: PurchaseOrder) => p.id === id)!;
    order.status = status;
    if (status === PurchaseStatus.RECEIVED) {
      order.items.forEach((i) => {
        const product = tenant.products.find((p: Product) => p.id === i.productId)!;
        product.stock += i.quantity;
        tenant.movements.push({
          id: createId(),
          product,
          type: MovementType.IN,
          quantity: i.quantity,
          date: new Date().toISOString(),
          reason: 'Compra',
        });
      });
      order.receivedAt = new Date().toISOString();
    }
  },
  async getDashboardData(tenantId: string) {
    await delay(200);
    const tenant: TenantData = data.tenants.find((t) => t.id === tenantId)!;
    const today = new Date().toISOString().slice(0, 10);
    const salesToday = tenant.sales.filter((s: Sale) => s.createdAt.startsWith(today)).reduce((sum: number, s: Sale) => sum + s.total, 0);
    const monthlySales = Array.from({ length: 12 }, (_, idx) => {
      const m = String(idx + 1).padStart(2, '0');
      const prefix = new Date().getFullYear() + '-' + m;
      return {
        month: prefix,
        total: tenant.sales.filter((s: Sale) => s.createdAt.startsWith(prefix)).reduce((sum: number, sale: Sale) => sum + sale.total, 0),
      };
    });
    return { salesToday, monthlySales };
  },
};
