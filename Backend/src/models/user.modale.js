import mongoose from "mongoose";

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

userSchema.methods.isPasswordChange = async function(password){
    return await bcrypt.compare(password,this.password)
}


export const User = mongoose.model("user",userSchema) 

