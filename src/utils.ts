import { TenantSettings } from './types';

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export function formatCurrency(amount: number, settings: TenantSettings) {
  return new Intl.NumberFormat(settings.locale || 'en', {
    style: 'currency',
    currency: settings.currency,
  }).format(amount);
}

export function formatDate(iso: string, settings: TenantSettings) {
  return new Intl.DateTimeFormat(settings.locale || 'en', {
    dateStyle: 'medium',
  }).format(new Date(iso));
}

export async function exportToExcel(data: any[], fileName: string) {
  const { utils, writeFile } = await import('xlsx');
  const ws = utils.json_to_sheet(data);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, 'Data');
  writeFile(wb, fileName + '.xlsx');
}
