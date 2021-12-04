import React from 'react'

const Newsitem =(props)=>{
        let {title,description,imageUrl , newsUrl , author , Date , source} = props;
        return (
            <div className='my-3'>
                <div className="card">
                    <img src={imageUrl} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title}<span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger cardBadge">{source}</span></h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {author} on {Date}</small></p>
                        <a target={"_blank"} rel='noreferrer' href={newsUrl} className="btn btn-sm btn-primary">Read More </a>
                    </div>
                </div>
            </div>
        )
    
}

export default Newsitem;