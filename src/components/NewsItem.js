import React from "react";

const NewsItem = ({ title, description, imageUrl, newsUrl }) => {
  return (
    <div className="card">
      <img
        src={
          imageUrl
            ? imageUrl
            : "https://images.bild.de/663ab5d007ce2011c6839c5c/e23ee758fca67237ebd2997e0be81fb5,d3d4c76e?w=1280" // Placeholder image URL
        }
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <a
          href={newsUrl}
          target="_blank"
          rel="noreferrer"
          className="btn btn-sm btn-dark"
        >
          Read more
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
