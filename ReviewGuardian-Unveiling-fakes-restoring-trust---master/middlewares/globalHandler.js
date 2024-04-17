const globalErrHandler = (err, req, res, next) => {
    //status: failed/success/server error
    //message - the actual error message
    //stack - which line the error occured

    const stack = err.stack;
    const message = err.message;
    const status = err.status ? err.status: 'failed';
    const statusCode = err.statusCode ? err.statusCode : 500;
    //send response
    res.status(statusCode).json({
        message,
        status,
        stack
    });
};

module.exports = globalErrHandler;