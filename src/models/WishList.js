import mongoose from "mongoose";
import User from "./User";

const wishListSchema = new mongoose.Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User", required: true
    },
    products: [ {
        type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true
    },
    ],
},
{timestamps:true});

const WishList = mongoose.model("WhishList", wishListSchema);

export default WishList;