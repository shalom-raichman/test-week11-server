import { MissileLaunchStatusEnum } from '../enums/MissileLaunchStatusEnum'

export interface missileLaunch {
  rocketType: string
  timeToHit: number
  status: MissileLaunchStatusEnum
}