import React, { Component } from "react";
import Book from "../../components/Book";
export default class BookShelf extends Component {
  render() {
    const { changeShelf, shelf } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelf}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {/* If the books grid isn't empty, map out all of the books and display message if needed */}
            {this.props.books.length !== 0
              ? this.props.books.map((book, index) => (
                  <Book
                    books={this.props.books}
                    book={book}
                    key={book.id}
                    title={book.title}
                    // If a book has more than one author, separate them with a comma and a space
                    authors={
                      book.authors && book.authors.length > 0
                        ? book.authors.join(", ")
                        : ""
                    }
                    imageURL={book.imageLinks.smallThumbnail}
                    shelf={book.shelf}
                    changeShelf={changeShelf}
                  />
                ))
              : `Your ${ shelf } shelf is empty.`}
          </ol>
        </div>
      </div>
    );
  }
}
