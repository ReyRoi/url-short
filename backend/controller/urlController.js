const Url = require('../models/urlModel')
const shortid = require('short-unique-id')
const uid = new shortid({ length: 8 });
const createShortId =  async(req,res)=>{
    const{url} = req.body
    const shorterid = uid.rnd()
    if(!url){
       return  res.status(400).json({msg : "kindly send a url"})
    }

    const result = await Url.create({
        shortid : shorterid,
        redirectURL : url,
        history:[],
        createdBy: req.user._id
    })
    return res.status(200).json({shortid:shorterid})

}

const handleRedirection = async(req,res)=>{
    const shortid = req.params.id
    const data = await Url.findOneAndUpdate(
        {
            shortid
        },{
            $push:{
                history:{
                    timestamp: Date.now()
                }
            }
        }
    )
   
    res.redirect(data.redirectURL)
}

// const getTotalNumberOfClicks = async(req,res)=>{
//     const shortid= req.params.shortid
//     const data = await Url.findOne({shortid})
//     res.status(200).json({clicks : data.history.length, clickHistory : data.history})

// }


const getHistory = async(req,res)=>{
    const history = await Url.find({createdBy: req.user._id})
    res.status(200).json({urls:history})
}


module.exports = {createShortId,handleRedirection,getHistory}