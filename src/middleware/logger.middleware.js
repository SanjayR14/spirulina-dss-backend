const logger = (req, res, next) => {
    const time = new Date().toISOString();
    console.log(`[${time}] ${req.method} ${req.originalUrl}`);
    
    res.on('finish', () => {
        if (res.statusCode >= 400) {
            console.error(`[${time}] Error ${res.statusCode} - ${req.method} ${req.originalUrl}`);
        }
    });
    
    next();
};

module.exports = logger;
