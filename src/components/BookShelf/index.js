import React, { Component } from "react";
import Book from "../../components/Book";
export default class BookShelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {/* If the books grid isn't empty, map out all of the books and display message if needed */}
            {this.props.books.length !== 0
              ? this.props.books.map(book => (
                  <Book
                    key={book.title}
                    title={book.title}
                    // If a book has more than one author, separate them with a comma and a space
                    authors={
                      book.authors && book.authors.length > 0
                        ? book.authors.join(", ")
                        : ""
                    }
                    imageURL={book.imageLinks.smallThumbnail}
                    shelf = {book.shelf}
                  />
                ))
              : "The books list is empty."}
          </ol>
        </div>
      </div>
    );
  }
}
