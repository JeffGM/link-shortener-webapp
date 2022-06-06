export default class AuthMiddleware {
    static authenticate(req, res, next, dependencyContainer) {
        const authHeader = req.headers['authorization'];
        const authCookie = req.cookies["jwt"];

        const authToken = authHeader ? authHeader : authCookie;
        let token;

        if (authHeader) {
            token = authHeader.split(' ')[1]
        } else if (authCookie) {
            token = authCookie;
        }   
      
        if (token == null) return res.sendStatus(401);

        let tokenContents = dependencyContainer["jwtUtils"].getAccountFromToken(token);

        if (tokenContents) {
            return next();
        }
        
        return res.sendStatus(403);
    }
}