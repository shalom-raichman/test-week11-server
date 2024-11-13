import { NextFunction, Request, Response } from 'express'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers['authorization']
    if (!token) {
      res.status(400).json({
        err: 'token must be provided',
      })
      return
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET! || 'defualt')
    ;(req as any).user = payload
    next()
  } catch (err) {
    console.log(err)
    res.status(401).json((err as JsonWebTokenError).message)
  }
}
