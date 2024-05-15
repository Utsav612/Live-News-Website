import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor() {
    super();
    console.log("Hello I am constructor from News Component");
    this.state = {
      articles: [],
      loading: false,
      page: 1, // Corrected state initialization
      totalResults: 0, // Initializing totalResults
    };
  }

  async componentDidMount() {
    console.log("cdm");

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=654b014d6e8543699e62c84f8cdf72b6&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
  }

  handlePrevClick = async () => {
    if (this.state.page > 1) {
      const url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=654b014d6e8543699e62c84f8cdf72b6&page=${
        this.state.page - 1
      }&pageSize=${this.props.pageSize}`;
      const response = await fetch(url);
      const data = await response.json();
      this.setState((prevState) => ({
        page: prevState.page - 1,
        articles: data.articles,
      }));
    }
  };

  handleNextClick = async () => {
    console.log("Next");

    if (
      this.state.page + 1 <=
      Math.ceil(this.state.totalResults / this.props.pageSize)
    ) {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=654b014d6e8543699e62c84f8cdf72b6&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);

      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
      });
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center my-4">News Monkey - Top Headlines</h1>

        <div className="row">
          {this.state.articles.map((element, index) => {
            return (
              <div className="col-md-4" key={index}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 40) : ""}
                  description={
                    element.description ? element.description.slice(0, 100) : ""
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="d-flex justify-content-center mt-4">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark mx-2"
            onClick={this.handlePrevClick}
          >
            &laquo; Previous
          </button>
          <button
            disabled={
              this.state.page >=
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark mx-2"
            onClick={this.handleNextClick}
          >
            Next &raquo;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
