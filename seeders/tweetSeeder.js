const { faker } = require("@faker-js/faker");
const User = require("../models/User");
const Tweet = require("../models/Tweet");

faker.locale = "es";

module.exports = async () => {
  const tweets = [];
  const totalTweets = 20;

  for (let i = 0; i < totalTweets; i++) {
    const tweet = new Tweet({
      body: faker.lorem.sentence(10),
    });
    tweets.push(tweet);
  }
  for (const tweet of tweets) {
    const randomNumber = faker.datatype.number({ min: 0, max: 10 });
    const randomUser = await User.findOne().skip(randomNumber);
    tweet.userId = randomUser;
    randomUser.tweets.push(tweet);
    await randomUser.save();
  }

  for (const tweet of tweets) {
    const randomNumber = faker.datatype.number({ min: 0, max: 10 });
    for (let i = 0; i < randomNumber; i++) {
      const randomUser = await User.findOne().skip(randomNumber);
      tweet.likes.push(randomUser);
      await randomUser.save();
    }
  }

  await Tweet.insertMany(tweets);

  console.log("[Database] Se corrió el seeder de Tweets.");
};
