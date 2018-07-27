import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "../../components/Book";
import PropTypes from "prop-types";

export default class Search extends Component {
  render() {
    const { value, results, updateQuery, books, changeShelf } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title"
              value={value.trim()}
              onChange={updateQuery}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {value ? (
              results.map(eachResult => (
                <Book
                  books={books}
                  book={eachResult}
                  key={eachResult.id}
                  title={eachResult.title}
                  // If a book has more than one author, separate them with a comma and a space
                  authors={
                    eachResult.authors && eachResult.authors.length > 0
                      ? eachResult.authors.join(", ")
                      : ""
                  }
                  imageURL={
                    eachResult.imageLinks ? (
                      eachResult.imageLinks.smallThumbnail
                    ) : (
                      <div>
                        <h1>Invalid Search</h1>
                      </div>
                    )
                  }
                  shelf={eachResult.shelf}
                  changeShelf={changeShelf}
                />
              ))
            ) : (
              <div>
                <h1>Allowed Search Terms</h1>'Android', 'Art', 'Artificial
                Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball',
                'Bhagat', 'Biography', 'Brief', 'Business', 'Camus',
                'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook',
                'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital
                Marketing', 'Drama', 'Drawing', 'Dumas', 'Education',
                'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness',
                'Football', 'Future', 'Games', 'Gandhi', 'History', 'History',
                'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King',
                'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make',
                'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate',
                'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production',
                'Program Javascript', 'Programming', 'React', 'Redux', 'River',
                'Robotics', 'Rowling', 'Satire', 'Science Fiction',
                'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time',
                'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web
                Development', 'iOS'
              </div>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  value: PropTypes.string.isRequired,
  results: PropTypes.array.isRequired,
  updateQuery: PropTypes.func.isRequired,
  books: PropTypes.array,
  changeShelf: PropTypes.func.isRequired
};
