import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'
import BookShelf from './components/bookShelf.js'
import Search from './components/search.js'

class BooksApp extends React.Component {
  state = {
    books:[],
    currentlyReading:[],
    wantToRead:[],
    read:[],
  }

componentDidMount(){
    this.getBooks()
  }

getBooks(){
    BooksAPI.getAll().then((books) => {
        this.setState({ 
          books:books,
          currentlyReading: books.filter((book) => book.shelf==='currentlyReading'),
          wantToRead: books.filter((book) => book.shelf==='wantToRead'),
          read: books.filter((book) => book.shelf==='read')
        })
      })
  }

bookShelfUpdate = (book, shelf) => {
    BooksAPI.update(book, shelf).then((books) => {
      this.getBooks()
    })
  }


 

  render() {
    return (
      <div className="app">
      <Route exact path="/" render={() => (
        <div className="routerShelves">
         <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
       <BookShelf
        title="Currently Reading"
        shelfUpdate={this.bookShelfUpdate} 
        books={this.state.currentlyReading} 
       />
       <BookShelf
       title="Want To Read"
        shelfUpdate={this.bookShelfUpdate} 
        books={this.state.wantToRead} 
       />
       <BookShelf
       title="Read"
        shelfUpdate={this.bookShelfUpdate} 
        books={this.state.read} 
        
       />
       </div>
       )}/>
      
       	
       <Route path="/search" render={({history}) => (
        <Search 
    		books={this.state.books} 
			  shelfUpdate={this.bookShelfUpdate} /> 
          )}/>

		</div>

      
    )
  }
}


export default BooksApp
