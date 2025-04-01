import jwt from 'jsonwebtoken';
import express from 'express';

const router = express.Router();

router.post('/login', (req, res) => {
    const { username, password } = req.body;

  
    if (username === "admin" && password === "123456") {
        const token = jwt.sign(
            {
                sub: "Token",
                username,
                exp: Math.floor(Date.now() / 1000) + 60 
            },
            process.env.JWT_SECRET
        );

        return res.json({ token });
    }

    return res.status(401).json({ message: 'Credenciales inválidas' });
});

export default router;
