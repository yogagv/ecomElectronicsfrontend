import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({


    product: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        title: {
            type:String,
        }
    },

    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        name: {

            type:String,
        }
    },

    rating: {

        type: String,
        min: '0',
        max: '5',
        default: "Not rated"
    },

    Comment: {

        type: String
    },

    avgRating : {

        type: String
    }
})

export default mongoose.model("Review", ReviewSchema);