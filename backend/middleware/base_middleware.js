
function loggerMiddleware(req, res, next){
    console.log(`received request from: ${req.url}`)
    next()
}

export {loggerMiddleware}