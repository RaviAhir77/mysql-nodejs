import jwtGenerator from "../utils/jwtGenerator.js";


export const verifyToken = async (req, res, next) => {
    const headerToken = req.headers.authorization;
    const token = headerToken && headerToken.split(' ')[1];

    if (!token) {
        return res.status(400).json({ message: 'Token is required' });
    }

    try {
        const decode = await jwtGenerator.verifyJwt(token);
        if (!decode) {
            return res.status(400).json({ message: 'Invalid token' });
        }
        
        req.user = decode;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Token verification error', error });
    }
};

export const roleAuthorization = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!allowedRoles.includes(req.user.usertype)) {
            return res.status(403).json({ message: "Access denied" });
        }

        next();
    };
};
