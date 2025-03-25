import User from '../models/UserSchema.js'

export const allUsers = async (req, res, next) => {

    try{

        const users = await User.find()

        if(users){

            res.status(200).json({success:true, message:"Users found Successfully!", data: users});

        }    

    }catch(error){

        res.status(404).json({success:false, message:"no User Found!"})

        console.log(error.message)
    }

}


export const singleUser = async (req, res, next) => {

    const userId = req.params.id;

    try{

        const user = await User.findById(userId);

        if(!user){

            return res.status(404).json({success:false, message:"User not found!"});
        }

            const {password, role , ...rest} = user._doc;

            res.status(200).json({success:true, message:"User found Successfully!", data: {role, ...rest}});

    }catch(error){

        res.status(500).json({success:false, message:"Internal Server Error!"});

    }
}

export const profileUpdate = async (req, res, next) => {

    const userid = req.params.id;

    try{

        const profileUpdate = await User.findByIdAndUpdate(userid, {$set: req.body}, {$new: true});

        res.status(200).json({success:true, message:"Profile Updated Successfully!", data: profileUpdate});

    }catch(error){

        res.status(404).json({success:false, message:"Unable to update the user!"})

    }
}


export const profileDelete = async (req, res, next) => {

    const userid = req.params.id;

    try{

        if(!userid) {

            return res.status(404).json({success:false, message:"Profile not Found!"});
        }

            await User.findByIdAndDelete(userid);

            res.status(200).json({success:true, message:"Profile Deleted Successfully!"});

    }catch(error){

            res.status(500).json({success:false, message:"Failed to delete user!"});

    }

}

