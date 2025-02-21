export function formatCurrency(quantity: number) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(quantity)
}

export function formatDate(date: string) {
    const auxDate = date.split('T')[0].split('-')
    // const finalDate = auxDate.reverse()
    const finalDate = auxDate[2] + '-' + auxDate[1] + '-' + auxDate[0]
    return finalDate
    

}