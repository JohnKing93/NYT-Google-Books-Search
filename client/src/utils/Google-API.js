import axios from "axios";

const API_KEY = "AIzaSyDJyuHU1Q1qES0FnEVguJMuG-F5UnC_Iyc";

export default {
  // Gets all books
  searchBooks: function(term) {
    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${term}&key=${API_KEY}`);
  }
};
