import ApiError from ".src/utils/ApiError.js"
import User from ".src/models/user.modales.js"

class Authservice{
    async registerUser({name,email,password}){
       if ([name, email, password].some((field) => field?.trim() === '')){
         throw new ApiError(500,"User allready registered")
       }
    }
}


