export const authMiddleware = (req, res, next) => {
    const isAuthenticated = true
    if(!isAuthenticated){
        return res.status(400).send({message: `Neplatny pristup!`})
    }
    console.log("Autorizacia OK")
    next()
}