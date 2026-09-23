const express = require("express")
const { protect } = require("../middleware/authmiddleware")
const { getCourses, createCourses, updateCourses, deleteCourses } = require("../controllers/courseController")

const courseRoute = express.Router()

courseRoute.get("/",getCourses)


courseRoute.post("/",createCourses)

courseRoute.get("/:id",getCourses)

courseRoute.put("/:id",updateCourses)

courseRoute.delete("/:id",deleteCourses)



module.exports = courseRoute