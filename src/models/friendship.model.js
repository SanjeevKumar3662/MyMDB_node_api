import mongoose from "mongoose";

const friendshipSchema = new mongoose.Schema(
  {
    userA: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userB: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "blocked"],
      default: "pending",
    },
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

friendshipSchema.pre("save", function (next) {
  if (this.userA.equals(this.userB)) {
    return next(new Error("Users cannot be friends with themselves"));
  }
  next();
});

export const Friendship = mongoose.model("Friendship", friendshipSchema);
