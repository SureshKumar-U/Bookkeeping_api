

const Book = require('../models/books.models'); // Adjust the path as needed
const User = require('../models/user.models'); // Adjust the path as needed

  const borrowBook = async(req, res) =>{
  try {
    const { bookId, userId } = req.body; 

    if (!bookId || !userId) {
      return res.status(400).json({ message: 'Book ID and User ID are required' });
    }
    // Find the book
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if the book is already borrowed
    if (book.borrower) {
      return res.status(400).json({ message: 'Book is already borrowed' });
    }

    // Find the borrower
    const borrower = await User.findById(userId);
    if (!borrower) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the book with the new borrower
    book.borrower = borrower._id;
    await book.save();
    res.status(200).json({ message: 'Book borrowed successfully', book });
  } catch (error) {
    console.error('Error borrowing book:', error);
    res.status(500).json({ message: 'Server error' });
  }
}


const returnBook = async(req, res)=> {
    try {
      const bookId = req.params.id; 
      if (!bookId) {
        return res.status(400).json({ message: 'Book ID is required' });
      }
      // Find the book
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      // Check if the book is not borrowed
      if (!book.borrower) {
        return res.status(400).json({ message: 'Book is not currently borrowed' });
      }
      // Update the book to remove the borrower
      book.borrower = null;
      await book.save();
      res.status(200).json({ message: 'Book returned successfully', book });
    } catch (error) {
      console.error('Error returning book:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  


















module.exports = {borrowBook,returnBook}