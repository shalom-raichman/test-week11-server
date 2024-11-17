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
import { InterceptorsEnum } from '../enums/interceptorsEnum'

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
    const dbLaunch = await newMissileLaunch.save()
    handelCountToHit(newMissileLaunch._id as string)

    return dbLaunch
  } catch (err) {
    throw err
  }
}

export const handelCountToHit = async (_id: string) => {
  try {
    const dbLaunch = await missileLaunchModel.findById(_id)
    if (!dbLaunch) throw new Error('launch not found')
    const myInterval = setInterval(() => {
      if (
        dbLaunch.status == MissileLaunchStatusEnum.Launched &&
        dbLaunch.timeToHit > 0
      ) {
        dbLaunch.timeToHit -= 1
        dbLaunch.save()
      } else {
        dbLaunch.status = MissileLaunchStatusEnum.Hit
        dbLaunch.save()
        clearInterval(myInterval)
      }
    }, 1000)
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

export const interceptionService = async (
  _id: string,
  interceptorType: InterceptorsEnum
) => {
  try {
    console.log(interceptorType)
    const dbLaunch = await missileLaunchModel.findById(_id)
    if (!dbLaunch) throw new Error('launch not found')
    const interceptor = missiles.find((m) => m.name == interceptorType)
    if (!interceptor) throw new Error('interceptor type is not valid')
    if (dbLaunch.status == MissileLaunchStatusEnum.Intercepted)
      throw new Error('missile alredy intercepted')

    if (
      interceptor.intercepts.includes(dbLaunch.rocketType) &&
      interceptor.speed <= dbLaunch.timeToHit
    ) {
      dbLaunch.status = MissileLaunchStatusEnum.Intercepted
      dbLaunch.timeToHit = 0
      dbLaunch.save()
    } else {
      throw new Error('missile allredy hit the target ):')
    }
  } catch (err) {
    throw err
  }
}
