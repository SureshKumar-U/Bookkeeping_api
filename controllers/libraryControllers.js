const Library = require('../models/library.models');
const Book = require('../models/books.models');



const getAllLibraries = async (req, res) => {
  try {
    const libraries = await Library.find();
    res.status(200).json({ message: req.t("all_libraries_fetched_successfully"), data: libraries });
  } catch (error) {
    res.status(500).json({ message: req.t('server_error') });
  }
};

const getLibraryById = async (req, res) => {
  try {
    const { id } = req.params
    if(!id){
      return res.status(400).json({message:req.t("id_is_mandatory")})
    }
    const library = await Library.findById(id).populate('inventory')
    

    if (!library) {
      return res.status(404).json({ message: req.t('libraryNotFound') });
    }

    res.json(library);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: req.t('server_error') });
  }
};

const createLibrary = async (req, res) => {
  try {
    const { name, address } = req.body;
    if (!name || !address) {
      return res.status(200).json({ message: req.t("all_fields are_mandatory") })
    }
    const newLibrary = await Library.create({ name, address });
    return res.status(201).json({ message: req.t('libraryCreated'), library: newLibrary });
  } catch (error) {
    res.status(500).json({ message: req.t('server_error') });
  }
};


const updateLibrary = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address } = req.body;
    if(!id){
      return res.status(400).json({message:req.t("id_is_mandatory")})
    }
    const updatedLibrary = await Library.findByIdAndUpdate(id, { name, address }, { new: true })
    if (!updatedLibrary) {
      return res.status(400).json({ message: req.t('libraryNotFound') });
    }
    return res.status(200).json({ message: req.t('libraryUpdated'), library: updatedLibrary });
  } catch (error) {
    res.status(500).json({ message: req.t('server_error') });
  }
};

// Delete a library by its ID
const deleteLibrary = async (req, res) => {

  try {
    const { id } = req.params;
    if(!id){
      return res.status(400).json({message:req.t("id_is_mandatory")})
    }
    const deletedLibrary = await Library.findByIdAndDelete(id);
    if (!deletedLibrary) {
      return res.status(404).json({ message: req.t('libraryNotFound') });
    }
   return res.status(200).json({ message: req.t('libraryDeleted') });
  } catch (error) {
    res.status(500).json({ message: req.t('server_error') });
  }
};

const getAllBooksByLibrary = async (req, res) => {
  try {
    const libraryId = req.params.id;
    if (!libraryId) {
      return res.status(400).json({ message: 'Library ID is required' });
    }
    // Find the library and populate its inventory
    const library = await Library.findById(libraryId).populate('inventory');
    if (!library) {
      return res.status(404).json({ message: 'Library not found' });
    }
    return res.status(200).json({data :library.inventory});
  } catch (error) {
    console.error('Error retrieving library inventory:', error);
    res.status(500).json({ message: 'server_error' });
  }
}
const addBookToLibrary = async (req, res) => {
  try {
      const libraryId= req.params.id;
      const { bookId } = req.body;
      // Check if the book exists
      const book = await Book.findById(bookId);
      if (!book) {
          return res.status(404).json({ message: 'Book not found' });
      }

      // Check if the library exists
      const library = await Library.findById(libraryId);
      if (!library) {
          return res.status(404).json({ message: 'Library not found' });
      }

      // Ensure the book is not already in the library’s inventory
      if (library.books.includes(bookId)) {
          return res.status(400).json({ message: 'Book already in library inventory' });
      }

      // Add the book to the library’s inventory
      await Library.findByIdAndUpdate(libraryId, {
          $addToSet: { inventory: bookId }  // Add book to inventory
      });

      return res.status(200).json({ message: 'Book added to library inventory' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


const deleteBookFromLibrary = async (req, res) => {
  try {
    const libraryId = req.params.id;
    const bookId = req.params.bookId;

    if (!libraryId || !bookId) {
      return res.status(400).json({ message: 'Library ID and Book ID are required' });
    }
    // Find the library
    const library = await Library.findById(libraryId);
    if (!library) {
      return res.status(404).json({ message: 'Library not found' });
    }
    // Check if the book is in the inventory
    if (!library.inventory.includes(bookId)) {
      return res.status(400).json({ message: 'Book is not in the inventory' });
    }
    // Remove the book from the library's inventory
    library.inventory = library.inventory.filter(id => id.toString() !== bookId);
    await library.save();
    res.status(200).json({ message: 'Book removed from inventory successfully', library });
  } catch (error) {
    console.error('Error removing book from inventory:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  getAllLibraries,
  getLibraryById,
  createLibrary,
  updateLibrary,
  deleteLibrary,
  getAllBooksByLibrary,
  addBookToLibrary,
  deleteBookFromLibrary
};
