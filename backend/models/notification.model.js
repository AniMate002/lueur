import { model, Schema } from "mongoose";



const notificationSchema = new Schema({
    from : { type: Schema.Types.ObjectId, ref: 'User', required: true },
    to : { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, enum: ['follow', 'like', 'repost', 'post'] },
    read: { type: Boolean, default: false },
    target: {type: Schema.Types.ObjectId, ref: "Post"}
}, { timestamps: true })

export const Notification = model("Notification", notificationSchema)