import React ,{useState , useEffect} from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {
  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  
 
  const updateNews = async ()=> {
    props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3375598ef8e240beb821743dc5ecf21d&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30)
    let parseData = await data.json();
    props.setProgress(70);
    setArticles(parseData.articles);
    setTotalResults(parseData.totalResults);
    setLoading(false);
    props.setProgress(100)
  }

  // this componentDidMount method runs after render method
  useEffect(() => {
    document.title = `NewsMonkey- ${capitalizeFirstLetter(props.category)}`;
    updateNews();
    // eslint-disable-next-line
  } , [props.category])

  // handlePrevClick = async ()=>{
  //  this.setState({
  //    page:this.state.page-1
  //  })
  //   this.updateNews();
  // }
  // handleNextClick = async ()=>{
  //   this.setState({
  //     page:this.state.page+1
  //   })
  //   this.updateNews();

  // }

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3375598ef8e240beb821743dc5ecf21d&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1); 
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(articles.concat(parseData.articles));
    setTotalResults(parseData.totalResults);
  };
  
    return (
      <>
        <h2 className="text-center topheadline">NewsMonkey Top Headlines</h2>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <Newsitem
                      title={element.title}
                      description={
                        !element.description ? "" : element.description
                      }
                      imageUrl={
                        !element.urlToImage
                          ? "https://images.hindustantimes.com/tech/img/2021/11/02/1600x900/APTOPIX-Yukon-River-Disappearing-Salmon-0_1635821585994_1635821646782.jpg"
                          : element.urlToImage
                      }
                      newsUrl={element.url}
                      author={!element.author ? "unknown" : element.author}
                      Date={new Date(element.publishedAt).toGMTString()}
                      source={element.source.name}
                    ></Newsitem>
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>

        {/* <div className="d-flex justify-content-around my-3">
              <button className="btn btn-dark" onClick={this.handlePrevClick} disabled={this.state.page<=1}>&larr; Previous</button>
              <button className="btn btn-dark" onClick={this.handleNextClick} disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)}>Next &rarr;</button>
            </div> */}
      </>
    );
  
}

News.defaultProps = {
  country: "in",
  pageSize: 8,
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;