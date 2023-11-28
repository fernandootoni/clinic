import { User } from "../entities/User";
import { AppError } from "../../config/errors/AppError";
const jwt = require("jsonwebtoken")
import auth from "../../config/auth"

class Token {
  async createUserToken(user: User): Promise<string>{
    const token = jwt.sign({}, auth.secret_token, {
      subject: user.id,
      expiresIn: auth.expires
    })

    return token
  }

  getToken(authHeader: string) {
    const token = authHeader.split(" ")[1]
    if(!token)
      throw new AppError("Token missing")

    return token
  }

  getUserByToken(token: string) {
    const decoded = jwt.verify(token, auth.secret_token)
    const userId = decoded.sub

    return userId
  }
}

export { Token }