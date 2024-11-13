import { Request, Response } from 'express'

export const register = async (req: Request, res: Response) => {
  try {
    res.status(201).json({
      msg: 'fill up content here',
      err: false,
      data: null
    })
  } catch (err) {
    res.status(400).json({
      msg: 'fill here',
      err: true,
      data: null
    })
  }
}
export const login = async (req: Request, res: Response) => {
  try {
    res.status(201).json({
      msg: 'fill up content here',
      err: false,
      data: null
    })
  } catch (err) {
    res.status(400).json({
      msg: 'fill here',
      err: true,
      data: null
    })
  }
}
