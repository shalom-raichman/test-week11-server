import { Router } from 'express'
import { login, register } from '../routs/user.route'
import { getMissileLaunch, launchMissile, updateMissileStatus } from '../routs/missiles.router'
import verifyUser from '../middlewares/verifyUser'

const router = Router()

router.get('/missileLaunch', verifyUser, getMissileLaunch)

router.post('/missileLaunch', verifyUser, launchMissile)

router.patch('/missileLaunch', verifyUser, updateMissileStatus)


export default router
