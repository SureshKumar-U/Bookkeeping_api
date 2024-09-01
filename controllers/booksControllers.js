const Book = require('../models/books.models');
const Library = require('../models/library.models');
const User = require('../models/user.models');

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('author library borrower');
        res.status(200).json(books);
      } catch (error) {
        res.status(500).json({ message: req.t('server_error') });
      }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('author library borrower');
    if (!book) return res.status(404).json({ message: req.t('bookNotFound') });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: req.t('server_error') });
  }
};

const addNewBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json({ message: req.t('bookCreated'), book });
  } catch (error) {
    res.status(500).json({ message: req.t('server_error') });
  }
};

const updateBook = async (req, res) => {
  try {
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

module.exports = {
  getAllBooks,
  getBookById,
  addNewBook,
  updateBook,
  deleteBook
};
