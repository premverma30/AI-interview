import jwt from "jsonwebtoken"


const isAuth = async (req,res,next) => {
    try {
        let {token} = req.cookies

        if(!token){
            return res.status(400).json({message:"user does not have a token"})
        }
        const verifyToken = jwt.verify(token , process.env.JWT_SECRET)
        
        if(!verifyToken){
            return res.status(400).json({message:"user does not have a valid token"})
        }
        req.userId = verifyToken.userId

        next()
   

    } catch (error) {
        return res.status(500).json({message:`isAuth error ${error}`})
    }
    
}

export default isAuth




// import jwt from "jsonwebtoken"

// const isAuth = async (req, res, next) => {
//   try {
//     const { token } = req.cookies
//     if (!token) return res.status(400).json({ message: "User does not have a token" })

//     const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
//     if (!verifyToken) return res.status(400).json({ message: "Invalid token" })

//     // FIX: use id if token was signed with {id: user._id}
//     req.userId = verifyToken.id

//     next()
//   } catch (error) {
//     return res.status(500).json({ message: `isAuth error ${error}` })
//   }
// }

// export default isAuth