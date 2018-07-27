import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookShelf from "../../components/BookShelf";
import PropTypes from "prop-types";

export default class BookCase extends Component {
  render() {
    const { filterBooks, changeShelf } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              books={filterBooks("currentlyReading")}
              shelf="Currently Reading"
              changeShelf={changeShelf}
            />
            <BookShelf
              books={filterBooks("wantToRead")}
              shelf="Want to Read"
              changeShelf={changeShelf}
            />
            <BookShelf
              books={filterBooks("read")}
              shelf="Read"
              changeShelf={changeShelf}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

BookCase.propTypes = {
  changeShelf: PropTypes.func.isRequired,
  filterBooks: PropTypes.func.isRequired
};
