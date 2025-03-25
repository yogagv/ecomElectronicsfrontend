import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({

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

    product: {

        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required: true
        },

        name: {

            type: String
        },

        price: {

            type: Number
        },
    },

    quantity: {

        type: Number,
        required:true,
        default: 0
    },

    total: {

        type: Number,
        
    },

    totalAmount: {

        type: Number,
      

    },


}, { timestamps: true }
)

export default mongoose.model("Cart", CartSchema);