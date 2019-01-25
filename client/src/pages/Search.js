import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import GAPI from "../utils/Google-API";
import SAPI from "../utils/Server-API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { Input, TextArea, FormBtn } from "../components/Form";
import { Card, Cards, CardImage, CardBody, CardTitle, CardText, CardAuthor, CardButtonGroup, CardButtonSave, CardButtonSaved, CardButtonLink } from "../components/Card";

class Search extends Component {
  state = {
    books: [],
    title: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      GAPI.searchBooks(this.state.title)
      .then(res => {
        console.log(res.data.items);
        const items = res.data.items;
        const books = items.map(book => {
          book.saved = false;
          return book;
        });
        console.log(books);
        return books;
      })
      .then(books => {
        this.setState({ 
          books, 
          title: ""
        })
        console.log("State set!");
        console.log(this.state);
      })
      .catch(err => console.log(err));
    }
  };

  handleBookSave = event => {
    console.log(event);
    const foundBook = this.state.books.find(book => book.id === event);
    console.log(foundBook);
    console.log("Event Id: " + event);
    SAPI.saveBook({
      id: foundBook.id,
      title: foundBook.volumeInfo.title,
      author: foundBook.volumeInfo.authors,
      description: foundBook.volumeInfo.description,
      image: foundBook.volumeInfo.imageLinks.thumbnail,
      link: foundBook.volumeInfo.previewLink
    })
    .then(res => {
      console.log("Stored in MongoDb!");
      console.log(this.state.books);
      const books = this.state.books.map(book => {
        console.log(event);
        if (book.id === event) {
          book.saved = true;
        }
        return book;
      })
    return books;
    })
    .then(books => {
      this.setState({
        books
      });
    })
    .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Search Books</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <FormBtn
                disabled={!this.state.title}
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>
            </form>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Results</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <Cards>
                {console.log("Mapping...")}
                {this.state.books.map(book => (
                  <Card key={book.id}>
                    <CardImage src={book.volumeInfo.imageLinks.thumbnail} />
                    <CardBody>
                      <CardTitle>{book.volumeInfo.title}</CardTitle>
                      <CardText>{book.volumeInfo.description}</CardText>
                      <CardAuthor>{book.volumeInfo.authors}</CardAuthor>
                      <CardButtonGroup>
                        {book.saved ? (
                          <CardButtonSaved />
                        ) : (
                          <CardButtonSave onClick={() => this.handleBookSave(book.id)} />
                        )}
                        <CardButtonLink href={book.volumeInfo.previewLink} />
                      </CardButtonGroup>
                    </CardBody>
                  </Card>
                ))}
              </Cards>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Search;