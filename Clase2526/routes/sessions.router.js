import { Router } from 'express';

const router = Router();

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).send({ status: "error", error: "Incomplete values" });
        let exists = await usersService.findOne({ email: email });
        if (exists) return res.status(400).send({ status: "error", error: "User already exists" });
        let result = await usersService.create({
            name,
            email,
            password: createHash(password)
        })
        res.send({ status: "success", payload: result._id })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error", error: "Internal Error, contact support" })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).send({ status: "error", error: "Incomplete values" });
        let user = await usersService.findOne({ email: email });
        if (!user) return res.status(400).send({ status: "error", error: "User not found" })
        if (!isValidPassword(user, password)) return res.status(400).send({ status: "error", error: "Incorrect password" });
        req.session.user = {
            name: user.name,
            email: user.email,
            id: user._id
        }
        res.send({ status: "success", payload: user._id })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error", error: "Internal Error, contact support" })
    }
})


export default router;

