import User from '../models/UserSchema.js'
import Product from '../models/ProductSchema.js';
import Cart from '../models/CartSchema.js';

export const addtoCart = async (req, res, next) => {

    const { quantity, total, totalAmount } = req.body;
    
    try{

        const userId = req.userId;
        const productId = req.params.productId;

        const product = await Product.findById(productId);
        const user = await User.findById(userId);

        console.log("Product ID:",product);
        console.log("User ID:", user);

        if(!product){

            return res.status(404).json({success:false, message:"Product not Found!"});
        }

        if(!user){

            return res.status(404).json({success:false, message:"User not found!"});
        }
        
        const price = Number(product.price);
        const qty = Number(quantity);

        if (isNaN(price) || isNaN(qty) || qty <= 0) {
            return res.status(400).json({ success: false, message: "Invalid price or quantity" });
        }

        const total = price * qty;

        let cart = await Cart.findOne({ "user.id": userId, "product.id": productId });

        if (cart) {

            cart.quantity += Number(quantity);
            cart.total += Number(total);
            await cart.save();

        } else {

        let productCart = new Cart({

            user: {

                id: userId,
                name: user.name
            },

            product: {

                id: productId,
                name: product.name,
                price: product.price
            },

            quantity,
            total: total,
        })

        const pcart = await productCart.save();

        const cartItems = await Cart.find({ "user.id": userId });

        const totalAmount = cartItems.reduce((acc, item) => acc + item.total, 0);

        res.status(200).json({success:true, message:"Product successfully added to cart!", pcart,
            totalAmount: totalAmount});

   }}
   
   catch(error){

        res.status(500).json({success:false, message:"Internal Server Error!"});

        console.log(error.message)

    }
}

export const getCart = async (req, res, next) => {

    const userId = req.params.id;

    try{

        const cart = await Cart.find({'user.id': userId});

        if(!cart){

            return res.status(404).json({success:false, message:"Cart not found!"})
        }

            res.status(200).json({success:true, message:"Cart found successfully!", data: cart});

    }catch(error){

        res.status(500).json({success:false, message:"Internal server Error!"})

    }

}


export const removeCart = async (req, res, next) => {

    const { quantity,  total, totalAmount } = req.body

    const userId = req.params.id;
    const productId = req.params.productId;

    console.log(userId); 
    console.log(productId);


    try{

        const product = await Product.findById(productId);
        const user = await User.findById(userId);

        if(!product){

            return res.status(404).json({success:false, message:"Product not Found!"});
            
        }

        if(!user){

            return res.status(404).json({success:false, message:"User not found!"});
        }

        let cart = await Cart.findOne({ "user.id": userId, "product.id": productId });

        if (!cart) {
            return res.status(404).json({ success: false, message: "Product not found in cart!" });
        }

        const qtyToRemove = Number(quantity);

        if (isNaN(qtyToRemove) || qtyToRemove <= 0) {

            return res.status(400).json({ success: false, message: "Invalid quantity" });
        }

        if (cart.quantity <= qtyToRemove) {
            
            await Cart.deleteOne({ _id: cart._id });

        } else {
            
            cart.quantity -= Number(qtyToRemove);
            cart.total -= (Number(cart.product.price) * Number(qtyToRemove));
            await cart.save();
        }

        const cartItems = await Cart.find({ "user.id": userId });
        const totalAmount = cartItems.reduce((acc, item) => acc + item.total, 0);

        res.status(200).json({ success: true, message: "Product successfully removed from cart!", totalAmount: totalAmount });

    }catch(error){

        res.status(500).json({success:false, message:"Internal server error!"});

        console.log(error.message);
    }

}