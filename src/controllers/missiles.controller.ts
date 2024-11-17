import { Router } from 'express'
import { login, register } from '../routs/user.route'
import { getMissileLaunch, launchMissile, updateMissileStatus } from '../routs/missiles.router'
import verifyUser from '../middlewares/verifyUser'

const router = Router()

router.get('/', verifyUser, getMissileLaunch)

router.get('/:area', verifyUser, getMissileLaunch)

router.post('/', verifyUser, launchMissile)

router.patch('/', verifyUser, updateMissileStatus)


export default router
