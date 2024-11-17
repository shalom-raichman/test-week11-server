import { Request, Response } from 'express'
import { UserLoginDTO, UserRegisterDTO } from '../DTO/user.DTO'
import { loginService, registerService } from '../services/user.service'
import {
  getAllMisslieLaunch,
  getAllMisslieLaunchByArea,
  interceptionService,
  launchMissileService,
  updateMissileStatusService,
} from '../services/missiles.service'
import { MissileLaunchStatusEnum } from '../enums/MissileLaunchStatusEnum'
import { IMissileLaunch } from '../models/missileLaunch.model'
import { OrgnizationsEnum } from '../enums/orgnizationEnum'
import { InterceptorsEnum } from '../enums/interceptorsEnum'

export const getMissileLaunch = async (req: Request, res: Response) => {
  try {
    const missileLaunch = await getAllMisslieLaunch()
    res.status(201).json({
      msg: 'List of the missiles that launched',
      err: false,
      data: missileLaunch,
    })
  } catch (err) {
    res.status(400).json({
      msg: (err as Error).message,
      err: true,
      data: null,
    })
  }
}

export const getMissileLaunchByArea = async (req: Request, res: Response) => {
  try {
    const missileLaunch = await getAllMisslieLaunchByArea(req.params.area as OrgnizationsEnum)
    res.status(201).json({
      msg: 'List of the missiles that launch to your area',
      err: false,
      data: missileLaunch,
    })
  } catch (err) {
    res.status(400).json({
      msg: (err as Error).message,
      err: true,
      data: null,
    })
  }
}

export const launchMissile = async (
  req: Request<any, any, IMissileLaunch>,
  res: Response
) => {
  try {
    const missileLaunch = await launchMissileService(req.body, (req as any).user.user_id)
    res.status(201).json({
      msg: 'Missile launch successsfuly',
      err: false,
      data: missileLaunch,
    })
  } catch (err) {
    res.status(400).json({
      msg: (err as Error).message,
      err: true,
      data: null,
    })
  }
}

export const updateMissileStatus = async (
  req: Request<any, any, { _id: string; status: MissileLaunchStatusEnum }>,
  res: Response
) => {
  try {
    const {_id, status} = req.body
    const updatedLaunch = await updateMissileStatusService(_id, status)
    res.status(201).json({
      msg: 'Launch updated successfuly',
      err: false,
      data: updatedLaunch,
    })
  } catch (err) {
    res.status(400).json({
      msg: (err as Error).message,
      err: true,
      data: null,
    })
  }
}

export const interception = async (
  req: Request<any, any, { _id: string; interseptionType: InterceptorsEnum }>,
  res: Response
) => {
  try {
    const {_id, interseptionType} = req.body
    const updatedLaunch = await interceptionService(_id, interseptionType)
    res.status(201).json({
      msg: 'Launch intercepted successfuly',
      err: false,
      data: updatedLaunch,
    })
  } catch (err) {
    res.status(400).json({
      msg: (err as Error).message,
      err: true,
      data: null,
    })
  }
}