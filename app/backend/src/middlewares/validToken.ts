import { NextFunction, Response, Request } from 'express';

class validToken {
  public static validTK(req: Request, res: Response, next: NextFunction): Response | void {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    return next();
  }
}

export default validToken;
