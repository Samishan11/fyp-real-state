const mongoose = require("mongoose");

const booking = mongoose.model("Booking", {
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
  },
  room: { type: {} },
  prefered_room_type: { type: Number },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  contact: {
    type: String,
  },
  message: {
    type: String,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  booking_at: {
    type: Date,
    default: new Date(),
  },
  appointment: {
    type: String,
  },
  booking_till: {
    type: Date,
  },
  // offer_price: {
  //     type: Number,
  //     default: 0
  // },
  // accept: {
  //     type: Boolean,
  //     default: false
  // },
  payment: {
    type: Boolean,
    default: false,
  },
  amount: {
    type: Number,
  },
  people: {
    adult: {
      type: Number,
    },
    child: {
      type: Number,
    },
  },
  booked_on: { type: Date, default: new Date() },
});

module.exports = booking;
