import jwt from 'jsonwebtoken'
import authConfig from '../config/auth.json';
import { Request, Response, NextFunction } from 'express';

class AuthMiddleware {
    
    async auth(req:Request, res: Response, next: NextFunction) {
        let authHeader = <string>req.headers.authorization

        if(!authHeader) {
            res.status(401).send({ error: 'No token provide' })
        }
        
        const parts = authHeader?.split(' ')
        if(parts?.length !== 2){
            res.status(401).send({ error: 'Token error' })
        }

        const [ schema, token ] = parts;

        if(!/^Bearer$/i.test(schema)) {
            return res.status(401).send({ error: 'Token malformatted' })
        }

        jwt.verify(token, authConfig.secret, (err: any, decoded: any) => {
            if(err) {
                res.status(401).send({ error: 'Token invalid' })
            }
            res.locals.userId = decoded.id
            res.locals.username = decoded.username;

            return next()
        })

        /*let jwtPayload;
        try{
            jwtPayload = <any>jwt.verify(token, authConfig.secret);
            res.locals.jwtPayload = jwtPayload;
        } catch (error) {
            //If token is not valid, respond with 401 (unauthorized)
            res.status(401).send();
            return;
        }
        */
    }
}

export default AuthMiddleware;