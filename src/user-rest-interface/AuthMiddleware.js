export default class AuthMiddleware {
    static authenticate(req, res, next, dependencyContainer) {
        const authHeader = req.headers['authorization'];
        const authCookie = req.cookies["jwt"];

        const authToken = authHeader ? authHeader : authCookie;
        
        const token = authToken && authHeader.split(' ')[1];
      
        if (token == null) return res.sendStatus(401);

        let tokenContents = dependencyContainer["jwtUtils"].getAccountFromToken(token);

        if (tokenContents) {
            return next();
        }
        
        return res.sendStatus(403);
    }
}