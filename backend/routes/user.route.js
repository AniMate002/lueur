import { Router } from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getUserProfile, followUnfollowUser, getSuggestedUsers, updateUser, getAllUsers } from "../controllers/user.controller.js"


const router = Router()


router.get('/profile/:username', protectRoute, getUserProfile)
router.get('/suggested', protectRoute, getSuggestedUsers)
router.post('/follow/:id', protectRoute, followUnfollowUser)
router.post('/update', protectRoute, updateUser)
router.get('/all', protectRoute, getAllUsers)

export default router