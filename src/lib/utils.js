import jwt from "jsonwebtoken"

export const generteToken = (userId, res) => {
    const token = jwt.sign({userId})
}