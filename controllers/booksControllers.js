const Book = require('../models/books.models');
const Library = require('../models/library.models');
const User = require('../models/user.models');
const {bucket} = require("../config/firebase")


const getAllBooks = async (req, res) => {
    try {
const books = await Book.find().populate({ path: 'author', select: '-password' })
  .populate('library')  
  .populate({
    path: 'borrower',
    select: '-password' 
  });
        return res.status(200).status(200).json(books);
      } catch (error) {
        res.status(500).json({ message: req.t('server_error') });
      }
};

const getBookById = async (req, res) => {
  try {
    const {id} = req.params
    if(!id){
      return res.status(400).json({message:req.t("id_is_mandatory")})
    }
    const book = await Book.findById(req.params.id).populate('author library borrower');
    if (!book) return res.status(404).json({ message: req.t('bookNotFound') });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: req.t('server_error') });
  }
};

const addNewBook = async (req, res) => {
  try {
    const {title, author,library} = req.body
    if(!title || !author ){
      return res.status(400).json({message: req.t("all_fields_are_mandatory")})
    }
    const file = req.file; 
    if (!file) {
      return res.status(400).json({message: req.t("no_file_uploaded")});
    }
    const imageUrl = await saveAndGetUrlfromFBStroage(file)
    if(!imageUrl){
      return res.status(400).json({message:req.t("error_occured_in_while_storing_in_image_in_firebase")})
    }
    const book = await Book.create({title,image:imageUrl,author,library});
    res.status(201).json({ message: req.t('bookCreated'), book });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: req.t('server_error') });
  }
};

const updateBook = async (req, res) => {
  try {
    const file = req.file; 
    const imageUrl = await saveAndGetUrlfromFBStroage(file)
    req.body.image = imageUrl
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).json({ message: req.t('bookNotFound') });
    res.status(200).json({ message: req.t('bookUpdated'), book });
  } catch (error) {
    res.status(500).json({ message: req.t('server_error') });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: req.t('bookNotFound') });
    res.json({ message: req.t('bookDeleted') });
  } catch (error) {
    res.status(500).json({ message: req.t('server_error') });
  }
};

const saveAndGetUrlfromFBStroage = async(file)=>{
  try{
    const destination = `books/images/${file.originalname}`;
    // Upload file to Firebase Storage
    const fileUpload = bucket.file(destination);
    await fileUpload.save(file.buffer, {
      contentType: file.mimetype,
    });
  
  // Get the public URL of the uploaded file
  const [imageUrl] = await fileUpload.getSignedUrl({
   action: 'read',
   expires: '03-09-2025', // Set expiration date 
  });
  return imageUrl
}catch(err){
  
   return undefined
  }
}




module.exports = {
  getAllBooks,
  getBookById,
  addNewBook,
  updateBook,
  deleteBook
};
