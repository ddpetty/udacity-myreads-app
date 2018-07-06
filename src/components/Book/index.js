import React, { Component } from "react";
import * as BooksAPI from "../../components/BooksAPI";
import BookShelfChanger from "../../components/BookShelfChanger";

export default class Book extends Component {
  state = {
    books: []
  };
  //When the api data response arrives, store the data in state, triggering a render to update the UI.
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({
        books: books.map(book => book)
      });
      console.log(books);
    });
  }
  //Change Shelves method goes here
  render() {
    const { books } = this.state,
      IMAGE = books.map(bookImage => bookImage.imageLinks.smallThumbnail),
      TITLE = books.map(bookTitle => bookTitle.title),
      AUTHOR = books.map(bookAuthor => bookAuthor.authors.map(name => name));
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${IMAGE})`
              }}
            />
            <BookShelfChanger />
          </div>
          <div className="book-title">{TITLE}</div>
          <div className="book-authors">
            {/* Displays the author and if the author array is not empty, separate the authors with a comma and a space*/}
            {AUTHOR && AUTHOR.length > 0 ? AUTHOR.join(", ") : ""}
          </div>
        </div>
      </li>
    );
  }
}
