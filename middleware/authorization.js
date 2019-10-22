

function authorization(isRole){

    return (
        function(req, res, next){
            if(req.user.role != isRole){
                return res.status(403).send('No rights');
            }else{
                next();
            }
        }
    )
}

module.exports.author = authorization;


