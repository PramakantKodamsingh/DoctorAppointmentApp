import JWT from "jsonwebtoken";

export default async function authMiddleware(req, res, next) {
  //'next' function to pass control to the next middleware function.
  try {
    // Split the Authorization header to get the token part
    // The format is usually "Bearer <token>", so we split by space and get the second part
    const token = req.headers["authorization"].split(" ")[1];
    // Verify the token using JWT.verify method
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(200).send({
          message: "Auth Failed",
          success: false,
        });
      } else {
        // If the token is successfully verified, extract the user ID from the decoded token
        req.body.userId = decode.id; //here we get the Id so that we can compare with the real id and helps in authentication of the user
        // Call next() to pass control to the next middleware function
        next();
      }
    });
  } catch (error) {
    // console.log(error);
    res.status(401).send({
      message: "Auth Failed",
      success: false,
    });
  }
}
