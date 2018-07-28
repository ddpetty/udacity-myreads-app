import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import * as BooksAPI from "../../components/BooksAPI";
import BookCase from "../../components/BookCase";
import Search from "../../components/Search";

export default class BooksApp extends Component {
  state = {
    books: [],
    results: [],
    query: ""
  };

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

  //Filters books to each shelf
  filterBooks = shelf => {
    const { books } = this.state;
    return books.filter(book => book.shelf === shelf);
  };

  //Moves books from shelf to shelf
  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => {
        book.shelf = shelf;
        //Filters out old books and adds the new books to the array
        let newBooks = this.state.books
          .filter(b => b.id !== book.id)
          .concat(book);
        this.setState({ books: newBooks });
      })
      .catch(e => console.log(`${e}: the books were not updated properly.`));
  };
  //Updates input query
  updateQuery = e => {
    this.setState({ query: e.target.value }, this.searchBooks(e.target.value));
  };
  //Searches api based on query input
  searchBooks(query) {
    if (!query.trim()) {
      this.setState({
        results: []
      });
    }
    //Handles errors and sets states accordingly
    if (query.trim() && query.trim().length >= 3) {
      BooksAPI.search(query).then(returnedBooks => {
        if (returnedBooks.error) {
          this.setState({
            results: []
          });
          console.log(returnedBooks.error);
        } else {
          //Compares books on the main page to search page and syncs shelf values
          returnedBooks.forEach(returnedBook => {
            returnedBook.shelf = "none";
            this.state.books.forEach(shelvedBook => {
              if (returnedBook.id === shelvedBook.id) {
                returnedBook.shelf = shelvedBook.shelf;
              }
            });
          });
          this.setState({
            results: returnedBooks.map(result => {
              this.state.books.map(book => book.id).indexOf(result.id);
              return result;
            })
          });
        }
      });
    }
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <BookCase
                books={this.state.books}
                filterBooks={this.filterBooks}
                changeShelf={this.changeShelf}
              />
            )}
          />
          <Route
            exact
            path="/search"
            render={() => (
              <Search
                value={this.state.query}
                results={this.state.results}
                updateQuery={this.updateQuery}
                books={this.state.books}
                changeShelf={this.changeShelf}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}
