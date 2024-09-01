const express = require("express")
const router = express.Router()
const {borrowBook,returnBook} = require("../controllers/borrowControllers")

router.post("/borrow",borrowBook)
router.put("/return/:id",returnBook)
module.exports = router