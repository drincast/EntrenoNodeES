import { Router, Request, Response } from 'express';
import DB from '../sqlite';

const router = Router();

router.get('/heroes', (req: Request, res: Response) => {
    const query = 'SELECT * FROM tblHeroes';
    DB.ExecuteQuery(query, (err: Error, resp: any) => {
        if(err){
            console.log(err);

            res.status(400).json({
                ok: false,
                error: err
            });
        }

        console.log(resp);
        res.json({
            ok: true,
            message: 'Todo ok ++',
            heroes: resp
        });
    });    
});

router.get('/heroes/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    res.json({
        ok: true,
        message: 'xx',
        id
    });
});

export default router;