const Profile = require("../model/profile.model")
const UserAuth = require("../model/auth.model")

const createProfile = (async(datas)=>{
    try{
      const profile = await Profile.create(datas)
      return profile
    }
    catch(err){
      console.log(err)
      return res.status(403).json({error: "Server Error"})
    }
  })

  const handleProfile = (async(req, res)=>{
    try{
        const user_id  = req.id
        if(!user_id){
            return res.status(403).json({error: "Invalid user ID"})
        }
        else{
            // let wallet = await handleAllWallets(user_id)
            const user = await Profile.findOne({user_id})
            if(!user){
                return res.status(403).json({error: "User not found"})
            }
          return res.status(200).json({user})
        }
    }
    catch(err){
      console.log(err)
      return res.status(403).json({error: "Server Error"})
    }
})

const externalProfile = (async(req, res)=>{
  try{
      const user_id = req.params.id
      if(!user_id){
          return res.status(401).json({error: "Invalid User id"})
      }
      const user = await Profile.findOne({user_id})
      const { created_at } = await UserAuth.findOne({user_id})
      if(!user){
          return res.status(401).json({error:"User Not found"})
      }
      return res.status(200).json({user, joined_at:created_at})
  }
  catch(err){
      console.log(err)
      return res.status(403).json({error:"Server Error"})
  }
})

const handleChangUsername = (async(req, res)=>{
  try{
      const {username} = req.body
     const user_id = req.id
     const usernameExist = await Profile.findOne({username})
      if(usernameExist){
        return res.status(403).json({error: "Username already exist"})
      }
     await Profile.updateOne({user_id},{
          username
     })
     const user = await Profile.findOne({user_id})
      return res.status(200).json(user)
  }
  catch(err){
      console.log(err)
      return res.status(403).json({error: "Server Error"})
  }
})

const handleChangeProflePicture = (async(req, res)=>{
  const user_id = req.id
  const { img } = req.body
  try{
      if(!user_id){
          return res.status(403).json({error: "Invalid User_id"})
      }
      await Profile.updateOne({user_id},{
        profile_image: img
      })
      const user = await Profile.findOne({user_id})
      return res.status(200).json(user)
  }
  catch(err){
      console.log(err)
      return res.status(403).json({error: "Server Error"})
  }
})
  
module.exports = { createProfile, handleProfile, externalProfile, handleChangUsername 
  ,handleChangeProflePicture
}