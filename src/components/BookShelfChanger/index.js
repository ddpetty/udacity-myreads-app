import React, { Component } from "react";
import PropTypes from "prop-types";

export default class BookShelfChanger extends Component {
  render() {
    const { changeShelf, book } = this.props;
    return (
      <div className="book-shelf-changer">
        <select
          value={book.shelf}
          onChange={event => changeShelf(book, event.target.value)}
        >
          <option value="move" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

BookShelfChanger.propTypes = {
  changeShelf: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired
};
