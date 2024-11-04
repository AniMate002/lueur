import { Router } from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { createCommunity, getCommunity, getAllCommunities, followUnfollowCommunity } from "../controllers/community.controller.js";



const router = Router()

router.post('/create', protectRoute, createCommunity)
// router.post('/:name/update', protectRoute, updateCommunity)
router.post('/:name/follow', protectRoute, followUnfollowCommunity)
// router.delete('/:name', protectRoute, deleteCommunity)
router.get('/:name', protectRoute, getCommunity)
router.get('/', protectRoute, getAllCommunities)
// router.get('/following', protectRoute, getFollowingCommunities)

export default router