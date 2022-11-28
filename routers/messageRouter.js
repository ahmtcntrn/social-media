import express from "express"
import * as controller from "../controllers//messageController.js"
import * as validator from "../validations/index.js"
const router = express.Router()

router.get("/getAllMessages", controller.getAllMessages)
router.get("/getMessageById/:messageId", controller.getMessageById)
router.get("/getMessagesOfAChat", controller.getMessagesOfAChat)
router.get("/getAllMessagesBySenderId/:senderId", controller.getAllMessagesBySenderId)
router.get("/getAllMessagesByReceiverId/:receiverId", controller.getAllMessagesByReceiverId)
router.post("/create", [validator.Message.create()], controller.createMessage)
router.delete("/deleteById/:messageId", controller.deleteMessage)
router.delete("/deleteAChat", controller.deleteAChat)
export default router
