const planes = require("./../resources/planes")

const pagoCredito = (event) => {
    console.log('event: ', JSON.stringify(event, null, 2));

    const inputData = event.Input;

    validarPago(inputData);
    validarPlan(inputData);

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
    const { medioDePago } = data;
    const { nroTarjeta, cantCuotas } = data.tarjeta;
    if (nroTarjeta.length > 17 || nroTarjeta.length < 16) throw new Error('Numero de tarjeta invalido');
    if (medioDePago !== 'Debito') throw new Error('Metodo de pago invalido');
    if (!cantCuotas) throw new Error('Se necesita espicificar cantidad de cuotas')
}

const validarPlan = (data) => {
    const { plan } = data.servicio;
    console.log(plan);
    console.log(planes.planes.length);
    let fueValidado = false;
    let arrayPlanes = planes.planes
    for (let i = 0; i < arrayPlanes.length; i++) {
        console.log('entro');
        console.log(arrayPlanes[i].plan + "   " + plan);
        if (arrayPlanes[i].plan == plan) {
            fueValidado = true;
            return
        }
    }
    console.log(fueValidado);
    if (!fueValidado) throw new Error('El plan no existe')
}
exports.handler = (event, context, callback) => {
    callback(null, pagoCredito(event));
}