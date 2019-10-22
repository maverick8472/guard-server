
function errorHandler(err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.details[0].message);
}


module.exports = errorHandler;
