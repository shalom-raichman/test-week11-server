import inteceptionSchema, {
  IMissileInterception,
} from '../models/interseption.model'
import missileLaunchModel, {
  IMissileLaunch,
} from '../models/missileLaunch.model'
import missiles from '../data/missiles.json'
import { MissileLaunchStatusEnum } from '../enums/MissileLaunchStatusEnum'
import { OrgnizationsEnum } from '../enums/orgnizationEnum'

export const getAllMisslieLaunch = async () => {
  try {
    const missileLaunch = await missileLaunchModel.find()
    return missileLaunch
  } catch (err) {
    throw err
  }
}

export const getAllMisslieLaunchByArea = async (area: OrgnizationsEnum) => {
  try {
    const missileLaunch = await missileLaunchModel.find({ launchTo: area })
    return missileLaunch
  } catch (err) {
    throw err
  }
}

export const launchMissileService = async (missileLaunch: IMissileLaunch) => {
  try {
    missileLaunch.timeToHit = missiles.find(
      (m) => m.name === missileLaunch.rocketType
    )?.speed as number
    const newMissileLaunch = new missileLaunchModel(missileLaunch)
    return await newMissileLaunch.save()
  } catch (err) {
    throw err
  }
}

export const updateMissileStatusService = async (
  _id: string,
  status: MissileLaunchStatusEnum
) => {
  try {
    return await missileLaunchModel.findByIdAndUpdate(_id, { status: status })
  } catch (err) {
    throw err
  }
}
