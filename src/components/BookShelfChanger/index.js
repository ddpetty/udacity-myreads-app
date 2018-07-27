import React, { Component } from "react";
import PropTypes from "prop-types";

export default class BookShelfChanger extends Component {
  render() {
    const { changeShelf, book } = this.props;
    return (
      <div className="book-shelf-changer">
        <select
          defaultValue={book.shelf ? book.shelf : "none"}
          onChange={event => changeShelf(book, event.target.value)}
        >
          <option value="move" disabled>
            Move to...
          </option>
          <option
            value="currentlyReading"
            defaultValue={book.shelf === "currentlyReading"}
          >
            Currently Reading
          </option>
          <option value="wantToRead" defaultValue={book.shelf === "wantToRead"}>
            Want to Read
          </option>
          <option value="read" defaultValue={book.shelf === "read"}>
            Read
          </option>
          <option value="none" defaultValue={book.shelf === "none"}>
            None
          </option>
        </select>
      </div>
    );
  }
}

BookShelfChanger.propTypes = {
  changeShelf: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired
};
