import { Community } from "../models/community.model.js"
import { User } from "../models/user.model.js"



export const createCommunity = async (req, res) => {
    try {
        const { name, fullname } = req.body
        const user_id = req.user._id

        const user = await User.findById(req.user._id)

        if(!user) return res.status(404).json({error: "User was not found"})

        if(!name || !fullname) return res.status(400).json({error: "Name and fullname should be provided"})
        
        const newCommunity = new Community()
        
        newCommunity.name = name
        newCommunity.fullname = fullname
        newCommunity.admins = [user._id]

        await newCommunity.save()
        return res.status(201).json(newCommunity)
    } catch (e) {
        console.log("Error in createCommunity controller: ", e.message)
        return res.status(500).json({error: "Error in creating community"})
    }
}


export const getCommunity = async (req, res) => {
    try {
        const { name } = req.params
        const user_id = req.user._id

        const user = await User.findById(req.user._id)

        if(!user) return res.status(404).json({error: "User was not found"})

        const foundCommunity = await Community.findOne({name})
        .populate({
            path: "admins"
        })
        .populate({
            path: "followers"
        })

        if(!foundCommunity) return res.status(404).json({error: `Community was not found`})


        return res.status(200).json(foundCommunity)

    } catch (error) {
        console.log("Error in getCommunity controller: ", e.message)
        return res.status(500).json({error: "Error in fetching community"})
    }
}



export const getAllCommunities = async (req, res) => {
    try{

        const communities = await Community.find().sort({createdAt: -1})
        .populate({
            path: "admins"
        })
        .populate({
            path: "followers"
        })

        if(communities.length === 0) return res.status(200).json([])


        return res.status(200).json(communities)

    }catch(e){
        console.log("Error in getAllCommunities controller: ", e.message)
        return res.status(500).json({error: "Error in fetching all communities"})
    }
}



export const followUnfollowCommunity = async (req, res) => {
    try {
        const { name } = req.params
        const user = await User.findById(req.user._id)

        if(!user) return res.status(404).json({error: "User not found"})

        const community = await Community.findOne({name})

        if(!community) return res.status(404).json({error: "Community not found"})

        const isFollowing = community.followers.includes(user._id.toString())
        if(isFollowing){
            // UNFOLLOW
            await Community.findOneAndUpdate({name}, { $pull: {followers: user._id}})
            await User.findByIdAndUpdate(req.user._id, { $pull: { communities: community._id}})
            return res.status(200).json({message: "Community unfollowed successfully"})
        }else{
            await Community.findOneAndUpdate({name}, { $push: { followers: user._id}})
            await User.findByIdAndUpdate(req.user._id, { $push: { communities: community._id}})
            return res.status(200).json({message: "Community followed successfully"})
        }

    } catch (error) {
        console.log("Error in followUnfollowCommunity controller: ", e.message)
        return res.status(500).json({error: "Error in follow/unfollow community"})
    }
}