import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({

    product: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        name: {
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

    fullName: {
        type: String,
        required: true
    },

    phone: {
        type: Number,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    pincode: {
        type: String,
        required: true
    }

},   { timestamps: true}

)

export default mongoose.model("Order", OrderSchema);