import { body, query, param } from 'express-validator'
import User from "../dal/userDal.js";
const userValidator = {
    createUser() {
        return [
            body('username')
                .notEmpty({ ignore_whitespace: true }).withMessage("You must write an username")
                .isLength({ min: 3, max: 20 }).withMessage("Username must include 3-20 characters")
                .custom(async (value, { req }) => {
                    const result = await User.findOne({ username: value })
                    if (result) throw new Error('This username is already in use')
                    return true
                }),
            body('email').isEmail().withMessage("Invalid email.")
                .custom(async (value, { req }) => {
                    const result = await User.findOne({ email: value })
                    if (result) throw new Error('This email is already in use')
                    return true
                }),
            body('password')
                .notEmpty({ ignore_whitespace: true }).withMessage("You must write a password")
                .isLength({ min: 5, max: 25 }).withMessage("Password must include 5-25 characters"),
        ]
    },
    updateUser() {
        return [
            body('username')
                .notEmpty({ ignore_whitespace: true }).withMessage("You must write an username")
                .isLength({ min: 3, max: 20 }).withMessage("Username must include 3-20 characters")
                .custom(async (value, { req }) => {
                    const result = await User.findOne({ username: value })
                    if (result != null & req.params.userId != result?.Id) throw new Error('This username is already in use')
                    return true
                }),
            body('email').isEmail().withMessage("Invalid email.")
                .custom(async (value, { req }) => {
                    const result = await User.findOne({ email: value })
                    if (result != null & req.params.userId != result?.Id) throw new Error('This email is already in use')
                    return true
                })
        ]
    },
    paramValidateId() {
        return [
            param('userId').isNumeric().withMessage("Invalid Id")
                .custom(async (value, { req }) => {
                    const result = await User.getById(value)
                    if (!result) throw new Error("Invalid Id")
                    return true
                })

        ]
    }


}
export default userValidator