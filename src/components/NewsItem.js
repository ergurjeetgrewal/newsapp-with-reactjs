import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imgUrl, newsurl, author, date, source } = this.props;
        return (
            <div className="card">
                <div className="cardtopbar">
                    <span className="badge rounded-pill bg-danger">
                        {source}</span>
                </div>
                <img src={imgUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-muted">By {author ? author : 'Unknown'} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsurl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
                </div>
            </div>
        )
    }
}

export default NewsItem
