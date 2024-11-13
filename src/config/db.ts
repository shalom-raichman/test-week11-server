import { connect } from 'mongoose'

export const connectToMongo = async () => {
  try {
    await connect(process.env.DB_URI as string)
    console.log(`Successfuly conected to mongo`)
  } catch (err) {
    console.log("Can't conect to mongo")
  }
}
