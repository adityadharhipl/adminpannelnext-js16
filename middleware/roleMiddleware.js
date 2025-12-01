const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const { role } = req.user; 

    if (allowedRoles.includes(role)) {
      next();
    } else {
      res.status(403).json({ message: "Access forbidden: Insufficient permissions" });
    }
  };
};

export default roleMiddleware;
