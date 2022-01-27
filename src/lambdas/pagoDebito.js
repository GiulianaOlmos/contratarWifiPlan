const pagoDebito = (event)  => {
    console.log('event: ', JSON.stringify(event, null, 2)); 

    const inputData = event.Input;

    validarPago(inputData);

    return {
        status: 200,
        servicio: {
            plan: inputData.servicio.plan,
            precio: inputData.servicio.precio
        },
        estado: 'Pagado',
        cantCuotas: inputData.tarjeta.cantCuotas
    }

}

const validarPago = (data) => {
    const {medioDePago} = data;
    const {nroTarjeta} = data.tarjeta;
    if(nroTarjeta.length > 17 || nroTarjeta.length < 16) throw new Error('Numero de tarjeta invalido');
    if(medioDePago !== 'Debito') throw new Error('Metodo de pago invalido');
}
 
exports.handler = (event, context, callback) => {
    callback(null, pagoDebito(event));
}