import jwt from 'jsonwebtoken';

function isAuthenticated(req, res, next) {
  console.log("Tamo testando a autêntificação zé, calma aí")
  try {
    console.log(req.headers, "PRINT DO CABEÇALHO")
    const { authorization } = req.headers;
    console.log(authorization,'PRINT DA AUTORIZAÇÃO')
    const [, token] = authorization.split(' ');
    console.log(token,authorization)
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    console.log(userId)
    req.userId = userId;

    next();
  } catch (error) {
    res.status(401).send({ auth: false, message: 'Token invalid.' });
  }
}

export { isAuthenticated };