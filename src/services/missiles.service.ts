import inteceptionSchema, {
  IMissileInterception,
} from '../models/interseption.model'
import missileLaunchModel, {
  IMissileLaunch,
} from '../models/missileLaunch.model'

export const misileLaunch = async (missileLaunch: IMissileLaunch) => {
  try {
    const newMissileLaunch = new missileLaunchModel(missileLaunch)
    return await newMissileLaunch.save()
  } catch (err) {
    console.error(err)
    // return { err: true, msg: (err as Error).message }
  }
}

export const missileInterception = async (
  interceptor: IMissileInterception
) => {
  try {
    const newInterception = new inteceptionSchema(interceptor)
    return newInterception.save()
  } catch (err) {
    console.error(err)
  }
}

export const updateIntercetionStatus = async (
  interceptor: IMissileInterception
) => {
  try {
  } catch (err) {}
}
