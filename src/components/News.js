import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
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
    constructor() {
        super();
        this.state = {
            articles: this.articles,
            loading: false,
            page: 1,
        }
    }

    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9f90b9b758584a2e96bbbf161501f334&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url);
        data = await data.json()
        this.setState({ articles: data.articles, totalArticles: data.totalResults, loading: false })
        console.log(data)
    }
    async componentDidMount() {
        this.updateNews();
    }
    handlenextclick = async () => {
        this.setState({page:this.state.page+1})
        this.updateNews();
    }
    handlepreclick = async () => {
        this.setState({page:this.state.page-1})
        this.updateNews();
    }
    render() {
        return (
            <>
                <div className="container my-3">
                    <h2 className='text-center' style={{ margin: '35px 0px' }}>NewsToday - {this.props.headtitle}</h2>
                    {this.state.loading ? <Spinner /> :
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title == null ? element.title : element.title.slice(0, 45)} description={element.description == null ? element.description : element.description.slice(0, 88)} imgUrl={element.urlToImage == null ? "https://www.tbdhu.com/themes/de_theme/img/default-news-image-front.jpg" : element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>}
                </div>
                <div className='container d-flex justify-content-between'>
                    <button type='button' disabled={this.state.page <= 1} className="btn-sm btn-secondary" onClick={this.handlepreclick}>&larr; Prev</button>
                    <button type='button' disabled={this.state.page + 1 > Math.ceil(this.state.totalArticles / this.props.pageSize)} className="btn-sm btn-primary" onClick={this.handlenextclick}>Next &rarr;</button>
                </div>
            </>
        )
    }
}

export default News
