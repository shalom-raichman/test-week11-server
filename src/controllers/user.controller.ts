import { Router } from 'express'
import { login, profile, register } from '../routs/user.route'

const router = Router()

router.post('/register', register)

router.post('/login', login)

router.post('/profile', profile)

export default router
