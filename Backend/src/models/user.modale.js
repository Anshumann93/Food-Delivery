import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const userSchema = new Schema({
    userName:{
      type:String,
      require:true,
      unique:true,
      index:true,
      trim:true,
      lowercase:true
   },
    fullName:{
      type:String,
      trim:true,
      lowercase:true,
   },
    email:{
      type:String,
      require:true,
      lowercase:true,
      trim:true,
      unique:true
    },
    Image:{
      type:String,
      trim:true
    },
    password:{
      type:String,
      required:[true,"pass is req.."]
    }
},
{
 timestamps:true
})

userSchema.pre("save",async function (next){
  if(!thisisModified("password")) return;

  this.password = await bcrypt.hash(this.password,10)

});

userSchema.methods.isPasswordCorrect= async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = async function() {
  return jwt.sign(
    {
      _id:this._id,
      email:this.email,
      name:this.name
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
  );
}
userSchema.methods.generateRefreshToken = async function() {
  return jwt.sign(
    {
      _id:this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn:process.env.REFRESH_TOKEN_SECRET
    }
  );
}


export const User = mongoose.model("user",userSchema) 

