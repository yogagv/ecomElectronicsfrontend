import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({

        name: {

            type: String,
            required: true
        },

        imageurl: {

            type: String,
            required:true
        },

        category: {

            type: String,
            required:true
        },

        price: {

            type: Number,
            required: true
        },

        discount: {

            type: Number,
            
        },

        shortDesc : {

            type: String,
            required:true
        },

        description : {

            type: String,
            required: true
        },

        reviews: [{

            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Review",
            },

            rating: {

                type: String
            },

            Comment: {

                type: String
            }
        }],

        ratingsQuantity: {
    
        type: Number,
        default: 0,
    },
        
        user: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            name: {
                type:String,
                required:true,
            }
        }

},  { timestamps: true }
 )

export default mongoose.model("Product", ProductSchema);