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
router.post('/', checkAuth, checkRole('Admin'), createLibrary);
router.put('/:id', checkAuth, checkRole('Admin'), updateLibrary);
router.delete('/:id', checkAuth, checkRole('Admin'), deleteLibrary);



module.exports = router