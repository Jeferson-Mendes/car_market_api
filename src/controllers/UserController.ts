import { Request, Response } from 'express';
import IUser from '../models/User';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import authConfig from '../config/auth.json';

function generateToken( params = {} ) {
    return jwt.sign( params, authConfig.secret, {
        expiresIn: 86400
    } )
}

class UserController {
    async index(req: Request, res: Response){

        try {
            const users = await IUser.find()
            return res.send({ users })
        }catch(err) {
            return res.status(400).send({ erro: 'Fail to list user', err })
        }
    }

    async create(req: Request, res:Response){
        const data: { name: string, email: string, password: string, whatsapp: string } = req.body

        try {
            if( await IUser.findOne({ email: data.email })) {
                return res.status(400).send({ error: 'User already exists' })
            }

            const user: any = await IUser.create(data)

            user.password = undefined

            return res.send({ 
                user,
                token: generateToken({ id: user.id, username: user.name })
             })
        }catch(err) {
            return res.status(400).send({ erro: 'Fail to register user ', err })
        }
        
    }

    async auth(req: Request, res: Response) {
        
        const authTerms: { email: string, password: string } = req.body
        const user = await IUser.findOne({ email: authTerms.email }).select('+password')

        if(!user) {
            return res.status(400).send({ error: 'User not found' })
        }

        if(! await bcrypt.compare(authTerms.password, user.password)) {
            return res.status(400).send({ error: 'Invalid password' })
        }

        user.password = undefined

        return res.send({
            user,
            token: generateToken({ id: user.id, username: user.name })
        })
    }
    
}


export default UserController;