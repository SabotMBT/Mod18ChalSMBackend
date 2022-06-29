const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const validateEmail = function (email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validateEmail, "Please use a valid email address."],
    },
    password: {
      type: String,
      required: true,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.virtual("numfollwing").get(function () {
  return this.followedBy.length;
});
userSchema.virtual("numfollow").get(function () {
  return this.following.length;
});

userSchema.pre("save", function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const User = model("user", userSchema);

module.exports = User;
