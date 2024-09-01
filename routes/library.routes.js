const express = require("express")
const router = express.Router()
const {checkRole,checkAuth} = require("../middlewares/authmiddleware")
const {getAllLibraries, getLibraryById, createLibrary, updateLibrary,deleteLibrary,getAllBooksByLibrary,addBookToLibrary,deleteBookFromLibrary} = require("../controllers/libraryControllers")

router.get('/', getAllLibraries);
router.get('/:id', getLibraryById);
router.get("/:id/inventory", getAllBooksByLibrary)
router.post("/:id/inventory", addBookToLibrary)
router.delete("/:id/inventory", deleteBookFromLibrary)


// Protected routes
router.post('/', checkAuth, checkRole('Author'), createLibrary);
router.put('/:id', checkAuth, checkRole('Author'), updateLibrary);
router.delete('/:id', checkAuth, checkRole('Author'), deleteLibrary);



module.exports = router