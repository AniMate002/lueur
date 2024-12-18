import { model, Schema } from "mongoose";

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    fullname: {type: String, required: true},
    password: {type: String, required: true, minLength: 6},
    email: {type: String, required: true, unique: true},
    followers: [{type: Schema.Types.ObjectId, ref: 'User', default: []}],
    following: [{type: Schema.Types.ObjectId, ref: 'User', default: []}],
    communities: [{type: Schema.Types.ObjectId, ref: "Community", default: []}],
    notify: [{ type: Schema.Types.ObjectId, ref: 'User', default: []}],
    profileImg: {type: String, default: ''},
    coverImg: {type: String, default: ''},
    bio: {type: String, default: ''},
    link: {type: String, default: ''},
    likedPosts: [{type: Schema.Types.ObjectId, ref: 'Post', default: []}]
}, {timestamps: true})


export const User = model("User", userSchema)