import jwt from 'jsonwebtoken';

 
function isAuthenticated(req, res, next) {
  try {
    //------- IMPORTANTE --------
    const { authorization } = req.headers;
    //------- IMPORTANTE --------
    const [, token] = authorization.split(' ');
    console.log(token, "Print do Token")
    //------- IMPORTANTE --------
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
 
    req.userId = userId;
    next();
  } catch (error) {
    res.status(401).send({ auth: false, message: 'Token invalid.' });
  }
}
 
export { isAuthenticated };
 