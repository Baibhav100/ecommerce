const crypto=require('crypto');
const generatekey=()=>{
    return crypto.randomBytes(32).toString('hex');

}

const secretkey=generatekey();
console.log("the secret kry is :",secretkey);