const jwt = require('jsonwebtoken');
const validator = require("validator")
const Profile = require("../model/profile.model")
const Auth = require("../model/auth.model")
const bcrypt = require("bcryptjs")
const { createProfile } = require("./profile.controller")

const Images = [
    "https://res.cloudinary.com/dxwhz3r81/image/upload/v1720390192/avatar55_rtiys4.png",
    "https://res.cloudinary.com/dxwhz3r81/image/upload/v1720390141/avatar44_ncyqcw.png",
    "https://res.cloudinary.com/dxwhz3r81/image/upload/v1720398516/avatar1_l6garj.png",
    "https://res.cloudinary.com/dxwhz3r81/image/upload/v1720398515/avatar2_ztgal3.png",
    "https://res.cloudinary.com/dxwhz3r81/image/upload/v1720390128/avatar11_fbdw02.png",
    "https://res.cloudinary.com/dxwhz3r81/image/upload/v1720390124/avatar33_gnrkq8.png",
    "https://res.cloudinary.com/dxwhz3r81/image/upload/v1720389924/avatar66_daptmu.png",
    "https://res.cloudinary.com/dxwhz3r81/image/upload/v1720389880/avatar88_enyz9d.png"
]
const ImageFunction = (()=>{
    var item = Images[Math.floor(Math.random()*Images.length)];
    return item
})
const uniqueId = (length=15) => {
    return parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(length).toString().replace(".", ""))
}
const handleCreateOTP = ((length)=>{
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
}) 
  
    
const createToken = ((_id)=>{
    return  jwt.sign({_id}, `InenwiNIWb39Nneol?s.mee39nshoosne(3n)`, { expiresIn: '7d' })
})

const handleSignup = (async(req, res)=>{
    try{
        const { auth } = req.body
        if(!validator.isEmail(auth?.email)){
          return  res.status(404).json({error:"Email is not valid"})
        }
        if(!validator.isStrongPassword(auth?.password)){
           return res.status(401).json({error:"Password is not strong"})
        }
        const Emailexist = await Auth.findOne({ email: auth?.email })
        if (Emailexist){
          return  res.status(401).json({error:"Email already exist"})
        }
        if (!Emailexist){
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(auth?.password, salt)
            const user_id = uniqueId()
            const token = createToken(user_id)
            const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            function generateString(length) {
                let result = '';
                const charactersLength = characters.length;
                for ( let i = 0; i < length; i++ ) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return result;
            }
            let _auth = {
                user_id: user_id,
                email: auth?.email,
                password: hash,
                google_auth: false,
                created_at: new Date(),
                lastLoginAt: new Date(),
                provider: "email-password",
                emailVerified: false,
                last_login_ip: ""
            }
            let result = {
                born: "",
                firstname: '',
                lastname: '',
                user_id: user_id,
                hide_profile: false,
                hidden_from_public: false,
                refuse_friends_request: false,
                refuse_tips: false, 
                username : generateString(9).toString(),  
                profile_image: ImageFunction(),
                vip_level: 0,
                kyc_is_activated: false,
                next_level_point:1,
                total_wagered: 0,
                invited_code: auth.referral_code,
                google_auth_is_activated : false,
                is_suspend: false,
                vip_progress: 0,
                fa_is_activated: false,   
                earn_me: 0,
                commission_reward: 0,
                usd_reward : 100, 
                total_chat_messages:0,
            }
            await Auth.create(_auth)
            const _profile = await createProfile(result)
            return res.status(200).json({profile:_profile , token})
        }
    }
    catch(err){
        console.log(err)
        return  res.status(401).json({error:"Server Error"})
    }
})

const handleLogin = (async(req, res)=>{
    try{
        const { auth } = req.body
        const email = auth.email
        const password = auth.password
        if(!email || !password){
            return res.status(404).json({error: "Field is empty"})
        }
        const Emailexist = await Auth.findOne({ email })
        if (!Emailexist){
          return  res.status(401).json({error: "Invalid email"})
        }
        const match = await bcrypt.compare(password, Emailexist.password)
        if(!match){
          return res.status(404).json({error: 'Incorrect password'})
        }
        const _profile = await Profile.findOne({ user_id: Emailexist.user_id })
        const token = createToken(Emailexist?.user_id);
        return res.status(200).json({profile:_profile , token})
    }
    catch(err){
        console.log(err)
        return  res.status(401).json({error:"Server Error"})
    }
})

module.exports = {handleSignup, handleLogin }