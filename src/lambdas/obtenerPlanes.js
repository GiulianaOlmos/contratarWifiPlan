const planes = require("./../resources/planes")

const obtenerPlanes = () => {
 return planes
};

exports.handler = (event, context, callback) => {
 callback(null, obtenerPlanes());
};