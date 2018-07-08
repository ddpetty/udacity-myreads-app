import React, { Component } from "react";
import BookShelfChanger from "../../components/BookShelfChanger";

export default class Book extends Component {
  render() {
    const { changeShelf } = this.props;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${this.props.imageURL})`
              }}
            />
            <BookShelfChanger
              book={this.props.book}
              changeShelf={changeShelf}
            />
          </div>
          <div className="book-title">{this.props.title}</div>
          <div className="book-authors">{this.props.authors}</div>
        </div>
      </li>
    );
  }
}
