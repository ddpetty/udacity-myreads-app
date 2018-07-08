import React, { Component } from "react";
import "./App.css";
import * as BooksAPI from "../../components/BooksAPI";
import BookShelf from "../../components/BookShelf";

export default class BooksApp extends Component {
  state = {
    showSearchPage: false,
    books: []
  };
  //When the api data response arrives, getAllBooks is run and triggers a render to update the UI.
  componentDidMount() {
    this.getAllBooks();
  }
  //Gets all of the books from the API and sets the initial books state
  getAllBooks() {
    BooksAPI.getAll().then(books => {
      this.setState({
        books: books
      });
    });
  }

  //Moves books from shelf to shelf
  changeShelf = (book, shelf) => {
    //It takes the current book and moves it the shelf option selected
    BooksAPI.update(book, shelf)
      .then(() => {
        book.shelf = shelf;
        //Filters out old books and adds the new books to the array
        let newBooks = this.state.books
          .filter(b => {
            return b.id !== book.id;
          })
          .concat(book);
        //Resets the books state to refer to the newBooks
        this.setState({ books: newBooks });
      })
      .catch(e => console.log(`${e}: the books were not updated properly.`));
  };

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a
                className="close-search"
                onClick={() => this.setState({ showSearchPage: false })}
              >
                Close
              </a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid" />
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {/* BookShelves */}
                <BookShelf
                  //Filters out books that have the Currently Reading, Want to Read, and Read shelf status
                  books={this.state.books.filter(
                    book => book.shelf === "currentlyReading"
                  )}
                  shelf="Currently Reading"
                  changeShelf={this.changeShelf}
                />
                <BookShelf
                  books={this.state.books.filter(
                    book => book.shelf === "wantToRead"
                  )}
                  shelf="Want to Read"
                  changeShelf={this.changeShelf}
                />
                <BookShelf
                  books={this.state.books.filter(book => book.shelf === "read")}
                  shelf="Read"
                  changeShelf={this.changeShelf}
                />
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }
}
