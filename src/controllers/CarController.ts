
import { Request, Response } from 'express';
import Car from '../models/Car';

class CarController {
    async index(req: Request, res: Response) {
        const items = await Car.find({})

        const serializedItems = items.map( (item: any) => {
            return {
                name: item.name,
                image: item.image,
                details: item.details,
                diesel: item.diesel,
                car_brand: item.car_brand,
                category: item.category,
                year: item.year,
                color: item.color,
                price: item.price,
                uf: item.uf,
                city: item.city,
                authorName: item.authorName,
                authorId: item.authorId,
            //    img_url: `http://192.168.1.6:3333/uploads/${item.image}`
            }
        })

        return res.json(serializedItems)
    }

    async search(req: Request, res: Response) {
        const searchTerm = req.query.search_query;

        try {
            const searchResult: object[] = await Car.find( {name: {$regex: '.*' + searchTerm + '.*'} }).limit(5);

            return res.send({ results: searchResult });
        }catch(err) {
            return res.status(400).send({ error: 'Fail to search advertisement' })
        }
    }

    async create(req: Request, res: Response){
        const authorName: string = res.locals.username
        const authorId: string = res.locals.userId

        const { 
            name,
            details,
            diesel,
            car_brand,
            category,
            year,
            color,
            price,
            uf,
            city
        } = req.body;

        try {
            const data = {
                name,
                image: "imagem-teste", //req.file.filename,
                details,
                diesel,
                car_brand,
                category,
                year,
                color,
                price,
                uf,
                city,
                authorId,
                authorName,
            }
            const car = await Car.create( data )
            res.send( car )
        }catch(err) {
            res.status(400).send({ error: 'Fail to register new CAR', err })
        }

    }

    async update(req: Request, res: Response){
        const authorIdHeader  = req.headers.authorid; // Author id at the header
        const authorId: string = res.locals.userId
        
        if( !authorIdHeader ) {
            return res.status(400).send({ error: 'No author ID provide' })
        }
        if(authorIdHeader !== authorId) {
            return res.status(400).send({ error: 'You cant update that' })
        }

        try {

            await Car.updateOne({ authorId }, req.body)

            return res.send({ success: 'Your advertisement has been updated' })

        }catch(err) {
            return res.status(400).send({ error: 'Fail to update CAR info', err })
        }

    }
    async delete(req:Request, res: Response){
        const authorId = res.locals.userId
        const carId = req.params.id

        if( !carId ){
            return res.status(400).send({ error: "No CAR id provide" })
        }
        
        const car = await Car.findOne({ _id: carId }, (err: any)=>{
            if(err) {
                return res.status(400).send({ error: 'Car not found' })
            }
        })
        
        if( car.authorId !== authorId ){
            return res.status(400).send({ error: 'You cant delete this' })
        }

        try {
            await Car.deleteOne({ _id : carId })

            return res.send({ success: 'Has been deleted' })
        }catch(err){
            return res.status(400).send({ error: 'Fail to delete', err })
        }
        
    }
}

export default CarController;