function logger(req, res, next) {
    console.log(`${req.originalUrl} opan`)
    next()
}

export default logger