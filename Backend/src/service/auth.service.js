import ApiError from ".src/utils/ApiError.js"
import User from ".src/models/user.modales.js"

class Authservice {
  async registerUser({ name, email, password }) {
    if ([name, email, password].some((field) => field?.trim() === '')) {
      throw new ApiError(500, "All filds are required.")
    }

    const existedUser = await User.findOne({email})
    if (existedUser) {
      throw new ApiError(409, "Allready user Exits.")
    }

    const user = await User.create({
      name,
      email,
      password
    })
    
    const createdUser = await User.findByID(user._id).select(
      -"refreshToken -password"
    )
    if(!createdUser){
      throw new ApiError(500, "something went wrong while creation the user")
    }

    return createdUser;
  }

  async generateAccessAndRefreshToken({userId}){
    try {
      const user = await User.findByID(userId) 
      const accessToken = user.generateAccessToken()
      const refreshToken = user.generateRefreshToken()
      
      user.refreshToken = refreshToken
      await user.save({ValiditeBeforeSave:false})

      return {accessToken,refreshToken}
    } catch (error) {
      throw new ApiError(500, "Something went wrong while genrating Tokens")
    }
  }
}


