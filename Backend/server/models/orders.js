const mongoose = require("mongoose");

// Orders Schema based on this structure
// data: {
// 	_id: "",
// 	delivery_order: "",
// 	timestamp: "",
// 	recipient: {
// 		firstName: "",
// 		lastName: "",
// 		contact: "",
// 		deliveryAddress: "",
// 		deliveryPostal: "",
// 		},
// 	instructions: "",
// 	pickupTime: "",
// 	cost: "",
// 	driver: "",
// 	status: "",
// }

// user: {
// 	customer: {
// 		firstName: "",
// 		lastName: "",
// 		pickupAddress: "",
// 		pickupPostal: "",
// 	}
// }

const orderSchema = new mongoose.Schema(
	{
		delivery_order: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
		},
		user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
		recipient: {
			firstName: String,
			lastName: String,
			deliveryAddress: String,
			contact: {
				type: Number,
				required: true,
			},
			deliveryPostal: Number,
		},
		instructions: String,
		pickupTime: {
			type: Date,
		},
		cost: mongoose.Decimal128,
		driver: {
			type: String,
			required: true,
			lowercase: true,
		},
		status: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const userSchema = new mongoose.Schema(
	{
		user: {
			userName: { type: String, required: true, unique: true },
			email: { type: String, required: true },
			firstName: String,
			lastName: String,
			pickupAddress: String,
			pickupPostal: Number,
		},
	},
	{ timestamps: true }
);

const Orders = mongoose.model("orders", orderSchema);
const Users = mongoose.model("users", userSchema);
module.exports = { Users, Orders };
