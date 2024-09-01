const express = require("express")
const router = express.Router()
const multer = require('multer');
const { getAllBooks, getBookById,addNewBook,updateBook,deleteBook} = require("../controllers/booksControllers")
const storage = multer.memoryStorage(); 
const upload = multer({ storage });

router.get("/", getAllBooks)
router.get("/:id", getBookById)
router.post("/", upload.single("image"), addNewBook)
router.put("/:id",upload.single("image"), updateBook)
router.delete("/:id", deleteBook)


module.exports = router