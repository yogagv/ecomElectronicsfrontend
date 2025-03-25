import User from '../models/UserSchema.js';
import Order from '../models/orderSchema.js';
import Product from '../models/ProductSchema.js';

export const productOrder = async (req, res, next) => {

    const { fullName, phone, address, pincode } = req.body

    try{

        const productId = req.params.productId;
        const userId = req.userId;

        const product = await Product.findById(productId);
        const user = await User.findById(userId);

        if(!product){

            return res.status(404).json({success:false, message:"Prodcut not found!"});
        }

        if(!user){

            return res.status(404).json({success:false, message:"User not found"});
        }

        let order = new Order({

            user: {
                id: userId,
            },
            product: {
                id: productId,
            },

            fullName,
            phone,
            address,
            pincode
        })

        const productOrder = await order.save();

        res.status(200).json({success:true, message:"Order Booked Successfully!", productOrder});

    }catch(error){

        res.status(500).json({success:false, message:"Internal Server Error"})

    }

}

export const getOrder = async (req, res, next) => {

    const userId = req.params.id;

    try{

        const getOrder = await Order.find({'user.id': userId});

        console.log(getOrder);

        if(!getOrder){

            return res.status(404).json({success:false, message:"Order not found"});
        }

            res.status(200).json({success:true, message:"Order found successfully!", data: getOrder});


    }catch(error){

        res.status(500).json({success:false, message:"Internal Server Error!"})

    }
}

export const getAllOrder = async (req, res, next) => {

    try{

        const allOrders = await Order.find();

        if(!allOrders){

            return res.status(404).json({success:fasle, message:"Orders not Found!"});
        }

            res.status(200).json({success:true, message:"Orders found successfully!", allOrders});

    }catch(error){

        res.status(500).json({success:false, message:"Intenal server Error!"});

    }

}