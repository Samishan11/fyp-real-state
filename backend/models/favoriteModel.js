const mongoose = require("mongoose");

const favorite = mongoose.model("Favorite", {
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  property: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
  date: { type: Date, default: new Date() },
});

module.exports = favorite;
