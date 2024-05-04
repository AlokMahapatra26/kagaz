import express from 'express'
import { updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyToken.js';
import { deleteUser } from '../controllers/user.controller.js';
const router = express.Router();

router.get('/test' ,(req,res)=>{
    res.status(200).json({
        "message" : "its working"
    })
} )
router.post('/update/:id' , verifyToken , updateUser);
router.delete('/delete/:id' , verifyToken , deleteUser);

export default router;