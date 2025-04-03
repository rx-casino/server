const SolWallet = require("../model/sol-wallet.model")
const https = require('https');
const httpStatus = require("http-status");
const ccpaymentService = require("../services/ccpayment.service")
const catchAsync = require("../utils/catchAsync");
const crypto = require('crypto');
  
  const appId ='hVVUP4IvYQXjCyS3';
  const appSecret ='67d3453c83463e112adf4cb2ded56176';

const solIcon = "https://cryptologos.cc/logos/thumbs/solana.png?v=034"
const initializedWallets = (async (user_id)=>{
   let wallet =  {
            user_id,
            is_active: true,
            balance: 0,
            icon: solIcon, 
            symbol: "SOL",
            name: "SOLANA"
        }
    await createSOLWallet(wallet)
    return wallet
})

 // ================ store CD wallet  details ===================
const createSOLWallet = (async(wallet)=>{
    await SolWallet.create(wallet)
})

const fetchWallet = (async(user_id)=>{
   let _wallet = await SolWallet.findOne({user_id})
   return _wallet
})
// 0x9ab9C561e90808e845421D29433052eEb3F585d0
// 0x9ab9C561e90808e845421D29433052eEb3F585d0

const getPermanentDepositAddress = catchAsync (async (req, res) => {
    const { body: reqBody, reqId } = req;
    const reqData = {
        "referenceId": "123456" ,
        "chain":"BSC",
    }
    try {
        const pda = await ccpaymentService.getOrCreateAppDepositAddress(reqData)
        res.send(pda)
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            "message": "Internal Sever Error",
        })
    }
});

const fetchWalletEl = (async(req, res)=>{
    try{
        const user_id = req.id
        const wallet = req.params.wallet
        if(wallet === "fun"){
            const result = await FunCoupon.findOne({user_id})
            return res.status(200).json(result)
        }
    }
    catch(err){
        return res.status(401).json("Internal Sever Error")
    }
})

module.exports = {
    initializedWallets, fetchWalletEl, fetchWallet , getPermanentDepositAddress
}