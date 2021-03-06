import React, { Component } from "react";
import PropTypes from "prop-types";
import BookShelfChanger from "../../components/BookShelfChanger";

export default class Book extends Component {
  render() {
    const { changeShelf, title, authors, imageURL, book } = this.props;
    console.log(typeof imageURL);
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${imageURL})`
              }}
            />
            <BookShelfChanger book={book} changeShelf={changeShelf} />
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{authors}</div>
        </div>
      </li>
    );
  }
}

Book.propTypes = {
  changeShelf: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.string.isRequired,
  //Books with no images return objects
  imageURL: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  book: PropTypes.object
};
