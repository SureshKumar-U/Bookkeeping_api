const Library = require('../models/library.models');
const Book = require('../models/books.models');



const getAllLibraries = async (req, res) => {
  try {
    const libraries = await Library.find();
    res.json(libraries);
  } catch (error) {
    res.status(500).json({ message: req.t('server_error') });
  }
};

const getLibraryById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const library = await Library.findById(id).populate({
      path: 'books',
      populate: {
        path: 'borrower', // Assuming borrower is a reference field in Book
        select: 'name email' // Select fields from the borrower
      }
    });
    
    if (!library) {
      return res.status(404).json({ message: req.t('libraryNotFound') });
    }
    
    res.json(library);
  } catch (error) {
    res.status(500).json({ message: req.t('server_error') });
  }
};

const createLibrary = async (req, res) => {
  const { name, address } = req.body;
  try {
    const newLibrary = new Library({ name, address });
    await newLibrary.save();
    res.status(201).json({ message: req.t('libraryCreated'), library: newLibrary });
  } catch (error) {
    res.status(500).json({ message: req.t('server_error') });
  }
};

// Update details of a specific library by its ID
const updateLibrary = async (req, res) => {
  const { id } = req.params;
  const { name, address } = req.body;
  try {
    const updatedLibrary = await Library.findByIdAndUpdate(id, { name, address }, { new: true });
    
    if (!updatedLibrary) {
      return res.status(404).json({ message: req.t('libraryNotFound') });
    }
    
    res.json({ message: req.t('libraryUpdated'), library: updatedLibrary });
  } catch (error) {
    res.status(500).json({ message: req.t('server_error') });
  }
};

// Delete a library by its ID
const deleteLibrary = async (req, res) => {
  const { id } = req.params;
  
  try {
    const deletedLibrary = await Library.findByIdAndDelete(id);
    
    if (!deletedLibrary) {
      return res.status(404).json({ message: req.t('libraryNotFound') });
    }
    
    res.json({ message: req.t('libraryDeleted') });
  } catch (error) {
    res.status(500).json({ message: req.t('server_error') });
  }
};

const getAllBooksByLibrary = async(req,res)=>{
    try{

    }catch(err){

    }
}
const addBookToLibrary = async(req,res)=>{
    try{

    }catch(err){
        
    }
}

const deleteBookFromLibrary = async(req,res)=>{
    try{

    }catch(err){
        
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
