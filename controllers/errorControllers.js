exports.handleCustomErrors = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).send({ msg: err.msg })
    } else if (err.code === '22P02') {
        res.status(400).send({ msg: 'bad request!'})
    } else {
        next(err)
    }
}