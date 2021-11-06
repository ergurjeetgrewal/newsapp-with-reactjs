import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from './Spinner';

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'business',
        headtitle: 'Top Headlines'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        headtitle: PropTypes.string
    }

    articles = []
    constructor(props) {
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        super(props);
        this.state = {
            articles: this.articles,
            loading: true,
            page: 1,
            totalArticles: 0
        }
        document.title = `${capitalizeFirstLetter(this.props.category)} - NewsToday Get latest news`;
    }

    async updateNews() {
        this.props.setProgress(10);
        console.log(this.props.apiKey)
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        let data = await fetch(url);
        this.props.setProgress(30);
        data = await data.json()
        this.setState({ articles: data.articles, totalArticles: data.totalResults, loading: false })
        this.props.setProgress(70);
        // console.log(data)
        this.props.setProgress(100);
    }
    async componentDidMount() {
        this.updateNews();
    }
    // handlenextclick = async () => {
    //     this.setState({ page: this.state.page + 1 })
    //     this.updateNews();
    // }
    // handlepreclick = async () => {
    //     this.setState({ page: this.state.page - 1 })
    //     this.updateNews();
    // }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        let data = await fetch(url);
        data = await data.json()
        this.setState({
            articles: this.state.articles.concat(data.articles),
            totalArticles: data.totalResults,
        })
    }

    render() {
        return (
            <div>
                <h2 className='text-center' style={{ margin: '35px 0px' }}>NewsToday - {this.props.headtitle}</h2>
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalArticles}
                    loader={<Spinner></Spinner>}
                >
                    <div className="container">
                        {this.state.loading && <Spinner /> }
                            <div className="row">
                                {this.state.articles.map((element) => {
                                    return <div className="col-md-4" key={element.url}>
                                        <NewsItem title={element.title == null ? element.title : element.title.slice(0, 45)} description={element.description == null ? element.description : element.description.slice(0, 88)} imgUrl={element.urlToImage == null ? "https://www.tbdhu.com/themes/de_theme/img/default-news-image-front.jpg" : element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                    </div>
                                })}
                            </div>
                    </div>
                </InfiniteScroll>
            </div>
        )
    }
}

export default News
