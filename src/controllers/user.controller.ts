import "reflect-metadata";
import { User } from './../entity/User';
import { Router, Request, Response } from 'express';
import {createConnection} from "typeorm";
import * as cors from "cors";


// Assign router to the express.Router() instance
const router: Router = Router();

// is mounted on in the server.ts file.
router.get('/', (req: Request, res: Response) => {

  createConnection().then(async connection => {

    const users = await connection.manager.find(User);
    await connection.close();
    res.json(users);

  }).catch(error => console.log(error));
});

router.get('/:id', (req: Request, res: Response) => {

  createConnection().then(async connection => {
    const user = await connection.query(`SELECT * FROM ims.user where id = ${req.params.id} `);
    await connection.close();
    res.json(user);

  }).catch(error => console.log(error));
});

router.post('/:userName/:password', (req: Request, res: Response) => {

  createConnection().then(async connection => {
    const user = await connection.query(`SELECT * FROM ims.user where userName = '${req.params.userName}' and password = '${req.params.password}' `);
    await connection.close();

    res.json(user);


  }).catch(error => console.log(error));
});

// Export the express.Router() instance to be used by server.ts
export const UserController: Router = router;
