import React, { Component } from "react";
import "./App.css";
import * as BooksAPI from "../../components/BooksAPI";
import BookShelf from "../../components/BookShelf";
import Book from "../../components/Book";

export default class BooksApp extends Component {
  state = {
    showSearchPage: false,
    books: [],
    results: [],
    query: ""
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
  //Updates input query and handles it
  updateQuery = e => {
    this.setState({ query: e.target.value }, this.searchBooks(e.target.value));
  };
  //Searches api based on query input
  searchBooks(query) {
    if (query && query.length > 0) {
      BooksAPI.search(query, 20).then(results => {
        if (results.error) {
          results = [];
        }
        console.log(results);
        this.setState({ results });
      });
    } else {
      this.setState({ results: [] });
    }
  }
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
                <input
                  type="text"
                  placeholder="Search by title or author"
                  value={this.state.query}
                  onChange={this.updateQuery}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {/* Maps out all result titles */}
                {this.state.results.map(eachResult =>    
                <Book
                    books={this.props.books}
                    book={eachResult}
                    key={eachResult.id}
                    title={eachResult.title}
                    // If a book has more than one author, separate them with a comma and a space
                    authors={
                      eachResult.authors && eachResult.authors.length > 0
                        ? eachResult.authors.join(", ")
                        : ""
                    }
                    imageURL={eachResult.imageLinks.smallThumbnail}
                    shelf={eachResult.shelf}
                    changeShelf={this.changeShelf}
                  />)}
              </ol>
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
