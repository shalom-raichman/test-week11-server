import { Router } from 'express'
import { login, register } from '../routs/user.route'
import {
  getMissileLaunch,
  interception,
  launchMissile,
  updateMissileStatus,
} from '../routs/missiles.router'
import verifyUser from '../middlewares/verifyUser'

const router = Router()

router.get('/:area', verifyUser, getMissileLaunch)

router.get('/', verifyUser, getMissileLaunch)

router.post('/', verifyUser, launchMissile)

router.patch('/intercept', verifyUser, interception)

router.patch('/', verifyUser, updateMissileStatus)

export default router
