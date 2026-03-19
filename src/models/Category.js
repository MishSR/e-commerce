import mongoose from "mongoose";
import Category from "./Category.js";

const categorySchema = new mongoose.Schema ({
    name:{  String,
    required: true,
    trim: true 
    },

    description: {
        type: String, 
        required:true 
    },
    
    imageURL: {
        type: String,
        required: true,
        default: "http://placehold.co/800x600.png"
    },
    parentCategory: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default: null
    },
},
{timestamps: true}
);

const Category = mongoose.model("Category", categorySchema);

export default Category;