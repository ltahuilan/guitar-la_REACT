
const formatoDinero = (valor) => {
    return valor.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    })
}

export {
    formatoDinero
}