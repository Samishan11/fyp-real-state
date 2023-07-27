const express = require("express");
const {
  Booking,
  cancelBooking,
  mybookings,
  mybooking,
  mybookingdone,
  Update_Booking,
  TransicationHistory,
  Favorite,
  GetFavorite,
  DeleteFavorite,
  Rejectoffer,
} = require("../controller/bookingController");
const router = express.Router();
const { verifyUser } = require("../middleware/auth");

router.route("/booking").post(Booking);
router.route("/update/booking/:id").put(Update_Booking);
router.route("/booking-cancel/:user/:property").delete(cancelBooking);
router.route("/my-bookings/:type").get(verifyUser, mybookings);
router.route("/my-booking").get(verifyUser, mybooking);
router.route("/bookings").get(verifyUser, mybookingdone);
router.route("/transication-history").get(TransicationHistory);
router.route("/addtofavorite").get(verifyUser, GetFavorite).post(Favorite);
router.route("/removefromfavorite/:id").delete(verifyUser, DeleteFavorite);
router.route("/reject").post(verifyUser, Rejectoffer);

module.exports = router;
