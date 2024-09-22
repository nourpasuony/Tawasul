import rateLimit from "express-rate-limit";

const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

export default apiLimiter;
