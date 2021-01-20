import express from 'express';
//import multer from 'multer';
//import multerConfig from './config/multer';

import CarController from './controllers/CarController';
import UserController from './controllers/UserController';
import AuthMiddleware from './middleware/auth';

const carcontroller = new CarController();
const usercontroller = new UserController();

const authmiddleware = new AuthMiddleware();

const router = express.Router()
//const upload = multer(multerConfig)

// User routes
router.get('/user/all', usercontroller.index)
router.post('/user/create', usercontroller.create)
router.post('/user/auth', usercontroller.auth)


// Car routes
router.get('/car/all', carcontroller.index);
router.get('/car/search', carcontroller.search); // /car/search?search_query=bmw


router.use(authmiddleware.auth)
router.post('/car/create', carcontroller.create)
router.put('/car/update', carcontroller.update)
router.delete('/car/delete/:id', carcontroller.delete)

export default router;