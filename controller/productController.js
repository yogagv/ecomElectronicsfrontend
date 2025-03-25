import Product from '../models/ProductSchema.js';
import User from '../models/UserSchema.js';

export const addProduct = async (req, res, next) => {

    const {name, imageurl, category, price, 
          discount, shortDesc, description, reviews  } = req.body;

          try{

           const userid = req.userId

           const user = await User.findById(userid);

           if(!user) {

                return res.status(404).json({success:false, message:"User not found!"});
           }

           let product = new Product ({

            name, 
            imageurl, 
            category, 
            price, 
            discount, 
            shortDesc, 
            description, 
            reviews,
            user: {
                id: userid,
                name: user.name
            },

           })

           await product.save();

           res.status(200).json({success:true, message:"Product Saved Successfully!"});


          }catch(error){

            res.status(500).json({success:false, message:"Internal Server Error!"});

          }

}

export const allProduct = async (req, res, next) => {

    try{

        const products = await Product.find().populate('reviews');

        res.status(200).json({success:true, message:"Products Found Successfully!", data: products});

    }catch(error){

        res.status(404).json({success:false, message:"No Product Found!"})

        console.log(error.message);

    }

}

export const singleProduct = async (req, res, next) => {

    const productId = req.params.id

    try{

        const product = await Product.findById(productId).populate('reviews');

        if(!product){

            res.status(404).send({success:false, message:"No Product Found!"})
        }

            res.status(200).send({success:true, message:"Product Found Successfully!", data:product});

    }catch(error){

        res.status(500).send({success:false, message:"Internal Server Error!"});

        

    }
}


export const productByCategory = async (req, res, next) => {

    const productCategory = req.params.category;

    try{

        const product = await Product.find({category: new RegExp( productCategory, "i") }).populate('reviews');

        if(!product || product.length === 0) {

            return res.status(404).send({success:false, message:"Product not Found"});
        }

            res.status(200).send({success:true, message:"Product found successfully!", data: product});


    }catch(error){

        res.status(500).send({success:false, message:"Internal Server Error!"});

    }

}


export const productByName = async (req, res, next) => {

    const productName = req.params.name;

    try{

        const product = await Product.find({name: new RegExp( productName, "i") }).populate('reviews');

        if(!product || product.length === 0) {

            return res.status(404).send({success:false, message:"Product not Found"});
        }

            res.status(200).send({success:true, message:"Product found successfully!", data: product});


    }catch(error){

        res.status(500).send({success:false, message:"Internal Server Error!"});

    }

}


export const productByDiscount = async (req, res, next) => {

    try{

        const product = await Product.find({discount: { $gt: 0 } }).populate('reviews');

        if(!product || product.length === 0) {

            return res.status(404).send({success:false, message:"Product not Found"});
        }

            res.status(200).send({success:true, message:"Product found successfully!", data: product});


    }catch(error){

        res.status(500).send({success:false, message:"Internal Server Error!"});

           
    }

}



export const updateProduct = async (req, res, next) => {

        const productId = req.params.id;

        try {

            const productUpdate = await Product.findByIdAndUpdate(productId, {$set : req.body}, {$new : true}).populate('reviews');

            res.status(200).send({success:true, message:"Product Updated Successfully!", productUpdate});

        }catch(error){

            res.status(404).send({success:false, message:"unable to update the product!"});

        }

}

export const deleteProduct = async (req, res, next) => {

    const productId = req.params.id;
    const userId = req.userId;
    

    try{

        const product = await Product.findById(productId);

        if(!product){

            return res.status(404).send({success:false, message:"Product not found!"});
        }

        if(product.user.id.toString() !== userId.toString()){

            return res.status(403).send({success:false, message: "unauthorized: you cannot delete this tour"});
        }

        await Product.findByIdAndDelete(productId);

        res.status(200).send({success:true, message:"Product Deleted Successfully!"});

    }catch(error){

        res.status(500).send({success:false, message:"Failed to Delete Product!"});

    }

}