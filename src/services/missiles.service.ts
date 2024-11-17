import inteceptionSchema, {
  IMissileInterception,
} from '../models/interseption.model'
import missileLaunchModel, {
  IMissileLaunch,
} from '../models/missileLaunch.model'
import missiles from '../data/missiles.json'
import { MissileLaunchStatusEnum } from '../enums/MissileLaunchStatusEnum'
import { OrgnizationsEnum } from '../enums/orgnizationEnum'
import userModel from '../models/user.model'

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

export const launchMissileService = async (
  missileLaunch: IMissileLaunch,
  _id: string
) => {
  try {
    missileLaunch.timeToHit = missiles.find(
      (m) => m.name === missileLaunch.rocketType
    )?.speed as number
    const dbUser = await userModel.findById(_id)
    if (!dbUser) throw new Error('User not found')
    const resources = dbUser?.orgnization.resources.find(
      (r) => r.name == missileLaunch.rocketType
    )!
    if (resources?.amount <= 0)
      throw new Error('you do not have this resource avilable')
    resources.amount -= 1
    dbUser.save()
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
