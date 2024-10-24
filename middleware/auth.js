const jwt = require("jsonwebtoken")

function verifyJWT(req, res, next) {
    const auth = req.headers['authorization'].split(" ");
    const token = auth[1]
    console.log(token)

    console.log(token)
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
        
        // se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyJWT;
