import User from '../models/UserSchema.js';
import Product from '../models/ProductSchema.js';
import Review from '../models/ReviewSchema.js';

export const createReview = async (req, res, next) => {

    const { rating, Comment } = req.body;

    try{

    const userId = req.userId;
    const productId = req.params.productId;

    console.log("User", userId);
    console.log("Product", productId);

    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if(!user){

        return res.status(404).json({success:false, message:"User not Found!"});
    }
    if(!product){

        return res.status(404).json({success:false, message:"Product not Found!"})
    }

    let review = new Review({

        user: {
            id: userId,
            name: user.name
        },

        product: {
            id: productId,
            name: product.name
        },

        rating,
        Comment
    })

    const saveReview = await review.save();

    const reviews = await Product.findByIdAndUpdate(productId, {
        $push: { reviews: saveReview._id, reviews: {
            rating,
            Comment
        } }
    }, { new: true });

    console.log(reviews);

    res.status(200).json({success:true, message:"Review Saved Successfully!", data: saveReview});

    }catch(error){

        res.status(404).json({success:false, message:"Failed to save Review!"});

        console.log(error.message);

    }    

}

export const getReview = async (req, res, next) => {

    const productId = req.params.productId;

    console.log("ProductID:", productId);
    
    try{

        const review =  await Review.find({'product.id': productId})

        console.log(review);

        if(!review){

            return res.status(404).json({success:false, message:"Review not found!"});
        }

            res.status(200).json({success:true, message:"Product Review Found Successfully!", data: review});

    }catch(error){

            res.status(500).json({success:false, message:"Internal Server Error!"});

    }
}


export const getAllReview = async (req, res, next) => {

    const productId = req.params.productId;

    console.log("ProductID:", productId);
    
    try{

        const review =  await Review.find({})

        console.log(review);

        if(!review){

            return res.status(404).json({success:false, message:"Review not found!"});
        }

            res.status(200).json({success:true, message:"Product Review Found Successfully!", data: review});

    }catch(error){

            res.status(500).json({success:false, message:"Internal Server Error!"});

    }
}