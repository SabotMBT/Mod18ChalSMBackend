const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    postedBy: {
      type: String,
      required: true,
    },
    upvotes: {
      type: Number,
    },
    downvotes: {
      type: Number,
    },
    reactions: [reactionSchema],
  },
  { timestamps: true }
);

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
