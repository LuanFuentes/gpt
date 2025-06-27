export enum Role { ADMIN = 'Admin', USER = 'User' }
export enum SaleStatus { PENDING = 'Pendiente', PAID = 'Pagado', DELIVERED = 'Entregado', CANCELLED = 'Cancelado' }
export enum PurchaseStatus { PENDING = 'Pendiente', ORDERED = 'Ordenado', RECEIVED = 'Recibido' }
export enum MovementType { IN = 'Entrada', OUT = 'Salida' }

export interface User { id: string; name: string; email: string; role: Role; }
export interface TenantSettings { currency: string; currencySymbol: string; dateFormat: string; taxes: number; locale?: string; }
export interface Tenant { id: string; name: string; taxId: string; logoUrl?: string; users: User[]; settings: TenantSettings; }
export interface Customer { id: string; name: string; email: string; taxId: string; address: string; }
export interface Provider { id: string; name: string; email: string; taxId: string; address: string; }
export interface ProductCategory { id: string; name: string; }
export interface Product { id: string; name: string; description: string; category: ProductCategory; price: number; stock: number; imageUrl: string; }
export interface SaleItem { productId: string; productName: string; quantity: number; unitPrice: number; }
export interface Sale { id: string; customer: Customer; items: SaleItem[]; total: number; status: SaleStatus; createdAt: string; }
export interface SaleFormData { customerId: string; status: SaleStatus; items: { productId: string; quantity: number }[]; }
export interface PurchaseOrderItem { productId: string; productName: string; quantity: number; unitCost: number; }
export interface PurchaseOrder { id: string; provider: Provider; items: PurchaseOrderItem[]; total: number; status: PurchaseStatus; createdAt: string; receivedAt?: string; }
export interface PurchaseOrderFormData { providerId: string; status: PurchaseStatus; items: { productId: string; quantity: number; unitCost: number }[]; }
export interface InventoryMovement { id: string; product: Product; type: MovementType; quantity: number; date: string; reason: string; }
