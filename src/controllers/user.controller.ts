import { Router } from 'express'
import { login, register } from '../routs/user.route'

const router = Router()

router.post('/register', register)

router.post('/login', login)

export default router
