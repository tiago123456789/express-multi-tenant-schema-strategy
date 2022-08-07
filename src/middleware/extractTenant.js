module.exports = (req, res, next) => {
    const host = req.headers.host 
    const tenant = host.split(".")[0]
    req.tenant = tenant;
    next();
}