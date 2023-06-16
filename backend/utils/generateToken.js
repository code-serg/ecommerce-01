import jwt from 'jsonwebtoken';

const generateToken = (res, _id) => {
  const token = jwt.sign({ // create a token
    _id,
  }, process.env.JWT_SECRET, { expiresIn: '10d' }); 

  // Set JWT as HTTP-only cookie
  res.cookie('jwt', token, { 
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // only send cookie over https if not in development
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24 * 10 // 10 days
  });
}

export default generateToken;