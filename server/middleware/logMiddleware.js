export const loggerMIddleware = (req, res, next) => {
    console.log(`Poziadavka prisla na danu URL`)
    next()
}

