import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from './book.js'

class BookShelf extends Component {
  render() {
    const defaultCover =
      "https://books.google.com/googlebooks/images/no_cover_thumb.gif";

    return (
      <div className="list-books">
       
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">{this.props.title}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.props.books.map(book => (
                    <li key={book.id}>
                      <Book
											id={ book.id }
											authors={ book.authors }
											title={ book.title }
											imageLinks={ book.imageLinks }
											shelf={ book.shelf }
											shelfUpdate={ this.props.shelfUpdate }

											/>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book!</Link>
        </div>
      </div>
    );
  }
}

export default BookShelf;
