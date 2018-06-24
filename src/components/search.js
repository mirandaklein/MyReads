import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import StringRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as BooksAPI from '../BooksAPI'
import Book from './book.js'



class Search extends Component{
  state= {
    query: '',
    books: []
  }
updateSearchForBook = async (text) => {
	try {
		if(text !== ""){
		const searchResults = await BooksAPI.search(text);
		if (searchResults) {
			const books= searchResults.map((book) => {
				const searchBook = this.props.books.find((searchBook) => searchBook.id === book.id);
				const shelf = searchBook ? searchBook.shelf : 'none';

				return{
						id: book.id,
            shelf: shelf,
            authors: book.authors,
            title: book.title,
            imageLinks: {
                  thumbnail: book.imageLinks.thumbnail
					}
				};
			});
			this.setState({ books });
		}

		
		this.setState({
			query: text.trim(),
			books: searchResults || []
		})
	}
	} catch (err) {
		console.log(err);
		this.setState({
			query: undefined,
			books: []
		})
		return err;
	}

}
	render() {
      
const defaultCover = "https://books.google.com/googlebooks/images/no_cover_thumb.gif";
      let showingBooks = [];
      if (this.state.query) {
      	const match = new RegExp(StringRegExp(this.state.query), 'i')
				showingBooks = this.state.books.filter((book) => match.test(book.title) || match.test(book.authors))
      } else {
				showingBooks = this.state.books	
      }
if(showingBooks)
	showingBooks.sort(sortBy('title'))
  return(
    <div className="search-books">
            <div className="search-books-bar">
            <Link className="close-search" to="/">Close Search</Link>
          	 <div className="search-books-input-wrapper">  
            <input type="text" placeholder="Search by title or author"
    				onChange={(event)=>this.updateSearchForBook(event.target.value)}
    			/>

              </div>
            </div>
            <div className="search-books-results">
							<ol className="books-grid">
									{					
											showingBooks.map((book) =>
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
										)
									}
							</ol>
            </div>
          </div>
    )
	}
}

export default Search;