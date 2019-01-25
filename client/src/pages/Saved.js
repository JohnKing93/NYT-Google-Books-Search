import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import SAPI from "../utils/Server-API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { Card, Cards, CardImage, CardBody, CardTitle, CardText, CardAuthor, CardButtonGroup, CardButtonSave, CardButtonDelete, CardButtonSaved, CardButtonLink } from "../components/Card";

class Search extends Component {
  state = {
    books: []
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    SAPI.getBooks()
      .then(res =>
        this.setState({ books: res.data })
      )
      .then(res => {
        console.log(this.state.books);
      })
      .catch(err => console.log(err));
  };

  handleBookDelete = event => {
    SAPI.deleteBook(event)
    .then(res => {
      const books = this.state.books.filter(book => book.id != event);
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
              <h1>Saved Books</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <Cards>
                {console.log("Mapping...")}
                {this.state.books.map(book => (
                  <Card key={book.id}>
                    <CardImage src={book.image} />
                    <CardBody>
                      <CardTitle>{book.title}</CardTitle>
                      <CardText>{book.description}</CardText>
                      <CardAuthor>{book.author}</CardAuthor>
                      <CardButtonGroup>
                        <CardButtonDelete onClick={() => this.handleBookDelete(book.id)} />
                        <CardButtonLink href={book.link} />
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