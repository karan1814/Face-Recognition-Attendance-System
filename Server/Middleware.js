module.exports.ensureAuthenticated = (req , res , next) => {
    if(req.isAuthenticated()) return next();
    res.status(401).json({message: " not Authenticated "});
}

module.exports.isStudent = (req , res , next)=>{
    if (req.isAuthenticated() && req.user.role === 'student') {
        return next(); // Proceed if the user is a student
      }
      return res.status(403).json({ message: 'Access denied. Students only.' }); // Deny access if not a student
}

module.exports.isTeacher = (req ,res ,next)=>{
    if (req.isAuthenticated() && req.user.role === 'teacher') {
        return next(); // Proceed if the user is a teacher
      }
      return res.status(403).json({ message: 'Access denied. Teachers only.' }); // Deny access if not a teacher
}