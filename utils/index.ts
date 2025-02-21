export function formatCurrency(quantity: number) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(quantity)
}