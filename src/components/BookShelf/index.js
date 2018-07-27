import React, { Component } from "react";
import PropTypes from "prop-types";
import Book from "../../components/Book";
export default class BookShelf extends Component {
  render() {
    const { changeShelf, shelf, books } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {/* If the books grid isn't empty, map out all of the books and display message if needed */}
            {books.length !== 0
              ? books.map((book, index) => (
                  <Book
                    books={books}
                    book={book}
                    key={book.id}
                    title={book.title}
                    // If a book has more than one author, separate them with a comma and a space
                    authors={
                      book.authors && book.authors.length > 0
                        ? book.authors.join(", ")
                        : ""
                    }
                    imageURL={
                      book.imageLinks ? (
                        book.imageLinks.smallThumbnail
                      ) : (
                        <div>
                          <h1>Invalid Search</h1>
                        </div>
                      )
                    }
                    shelf={book.shelf}
                    changeShelf={changeShelf}
                  />
                ))
              : `Your ${shelf} shelf is empty.`}
          </ol>
        </div>
      </div>
    );
  }
}
BookShelf.propTypes = {
  changeShelf: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired,
  shelf: PropTypes.string.isRequired
};
