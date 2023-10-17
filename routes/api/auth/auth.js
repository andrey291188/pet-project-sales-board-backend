const express = require("express")

const {authCtrl: ctrl} = require("../../../controllers")

const { validateBody, authenticate, upload } = require("../../../middlewares")
const { userValidationSchema, emailVerifySchema, loginUserSchema, userAdminSchema } = require("../../../schemas");

const router = express.Router();


router.get("/", authenticate, ctrl.getAllUsers);

router.delete("/:userId", authenticate, ctrl.deleteUser);


router.post("/register", validateBody(userValidationSchema), ctrl.registerUser);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post("/verify", validateBody(emailVerifySchema), ctrl.resendVerifyEmail);

router.post("/login", validateBody(loginUserSchema), ctrl.loginUser);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logoutUser);

router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar);

router.patch("/admin", authenticate, validateBody(userAdminSchema), ctrl.activeAdmin)


module.exports = router