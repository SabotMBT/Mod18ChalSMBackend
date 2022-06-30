const connection = require("../config/connection");
const { User, Thought } = require("../models");

connection.on("error", (err) => err);
connection.once("open", async () => {
  console.log("connected");
  await User.deleteMany({});
  await Thought.deleteMany({});
  console.log("Database Refreshed!");

  await Thought.create(
    {
      text: "Wow! Never expected that!",
      postedBy: "SpecificProtagonist",
      upvotes: 5,
      downvotes: 2,
      reactions: [
        {
          reactionText: "Never expected what??",
          userName: "Judge",
        },
      ],
    }, // 0 -
    {
      text: "Has anyone else noticed that Pepsi doesn't taste like Pepsi anymore?",
      postedBy: "Judge",
      upvotes: 168,
      downvotes: 33,
      reactions: [
        {
          reactionText: "Yass! I deff agree!",
          userName: "SpecificProtagonist",
        },
      ],
    }, //1 -
    {
      text: "Who else is excited for Matrix 6?!?! I know I am!!!",
      postedBy: "SpecificProtagonist",
      upvotes: 7,
      downvotes: 3,
      reactions: [
        {
          reactionText: "Eh, just seems like another moneygrab to me.",
          userName: "Bagrat",
        },
      ],
    }, //2 -
    {
      text: "Pro tip: don't walk alone at night in London. Place is a madhouse.",
      postedBy: "Bagrat",
      upvotes: 526,
      downvotes: 57,
      reactions: [
        {
          reactionText: "Good advice; being careful never hurts.",
          userName: "Judge",
        },
      ],
    }, //3 -
    {
      text: "Just saw some idiot driving the wrong way on the interstate. Stay safe out there, guys!",
      postedBy: "Bagrat",
      upvotes: 983,
      downvotes: 71,
      reactions: [
        {
          reactionText: "Someone's gonna get a DUI tonight...",
          userName: "Judge",
        },
      ],
    }, //4 -
    {
      text: "I need some coffee...",
      postedBy: "Judge",
      upvotes: 123,
      downvotes: 13,
      reactions: [
        {
          reactionText:
            "I know a good place at the corner of Lord's and Market. Their coffee is great, their prices low, and they deliver. ",
          userName: "Bagrat",
        },
      ],
    }, //5 -
    {
      text: "If the quick brown fox jumped over the lazy dog, then that dog must have been a police dog, lol.",
      postedBy: "SpecificProtagonist",
      upvotes: 8,
      downvotes: 1,
      reactions: [
        {
          reactionText:
            "Probably because the police dog was more worried about crime than a silly fox.",
          userName: "Bagrat",
        },
      ],
    }, //6 -
    {
      text: "... Why do I even bother anymore? *User was banned for this post*",
      postedBy: "SpecificProtagonist",
      upvotes: 1,
      downvotes: 9,
      reactions: [
        {
          reactionText:
            "SP? You ok? If you need to talk to someone, you can DM me.",
          userName: "Bagrat",
        },
      ],
    }, //7 -
    {
      text: "*This post violates our community guidelines and has been removed*",
      postedBy: "Bagrat",
      upvotes: 18,
      downvotes: 196,
      reactions: [
        {
          reactionText: "Holy hell, man, watch your profanity!",
          userName: "Judge",
        },
      ],
    }, //8 -
    {
      text: "OMG JoJo Siwa is so cool! I wish I could see her live...",
      postedBy: "SpecificProtagonist",
      upvotes: 3,
      downvotes: 0,
      reactions: [
        {
          reactionText: "... who?",
          userName: "Judge",
        },
      ],
    }, //9 -
    console.log("Thoughts Seeded!")
  );

  const u1Post = await Thought.find({ postedBy: "SpecificProtagonist" });
  // console.log(u1Post);
  const u2Post = await Thought.find({ postedBy: "Judge" });
  // console.log(u2Post);
  const u3Post = await Thought.find({ postedBy: "Bagrat" });
  // console.log(u3Post);

  await User.create(
    {
      userName: "SpecificProtagonist",
      email: "specprog@none.net",
      password: "supersecret",
      thoughts: u1Post,
      following: [],
      followedBy: [],
    },
    {
      userName: "Judge",
      email: "Judge@none.net",
      password: "supersecret",
      thoughts: u2Post,
      following: [],
      followedBy: [],
    },
    {
      userName: "Bagrat",
      email: "bagrat@none.net",
      password: "supersecret",
      thoughts: u3Post,
      following: [],
      followedBy: [],
    },
    console.log("Users Seeded!")
  );

  const u1Following = await User.find({
    userName: { $in: ["Judge", "Bagrat"] },
  });
  console.log(u1Following);
  await User.findOneAndUpdate(
    { userName: "SpecificProtagonist" },
    { following: u1Following }
  );
  const u2Following = await User.find({ userName: "Bagrat" });
  console.log(u2Following);
  await User.findOneAndUpdate(
    { userName: "Judge" },
    { following: u2Following }
  );
  const u3Following = await User.find({ userName: "Judge" });
  console.log(u3Following);
  await User.findOneAndUpdate(
    { userName: "Bagrat" },
    { following: u3Following }
  );

  const u2FollowedBy = await User.find({
    userName: { $in: ["Bagrat", "SpecificProtagonist"] },
  });
  console.log(u2FollowedBy);
  await User.findOneAndUpdate(
    { userName: "Judge" },
    { followedBy: u2FollowedBy }
  );
  const u3FollowedBy = await User.find({
    userName: { $in: ["Judge", "SpecificProtagonist"] },
  });
  console.log(u3FollowedBy);
  await User.findOneAndUpdate(
    { userName: "Bagrat" },
    { followedBy: u3FollowedBy }
  );
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
