import React, { Component } from "react";
import "./App.css";
import * as BooksAPI from "../../components/BooksAPI";
import BookShelf from "../../components/BookShelf";

export default class BooksApp extends Component {
  state = {
    showSearchPage: false,
    books: []
  };
  //When the api data response arrives, store the data in state, triggering a render to update the UI.
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      console.log(books);
      this.setState({
        books: books
      });
    });
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
                  books={this.state.books}
                  shelfTitle="Currently Reading"
                />
                <BookShelf books={this.state.books} shelfTitle="Want to Read" />
                <BookShelf books={this.state.books} shelfTitle="Read" />
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
