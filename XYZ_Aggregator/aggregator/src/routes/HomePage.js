import React, { useState, useEffect } from 'react';
import './HomePage.css'

const API_KEY = '0cb8f7e1a94d4d498816734a728aa82f';
const url = 'https://newsapi.org/v2/everything?q=';

const topics = ['Home', 'Sports', 'Finance', 'Technology', 'Bollywood'];

const HomePage = ({ setArticles }) => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [articles, setArticlesState] = useState([]);
  const [showMiniBrowser, setShowMiniBrowser] = useState(false);
  const [selectedArticleUrl, setSelectedArticleUrl] = useState('');

  useEffect(() => {
    fetchNews(searchText || 'Cricket');
  }, [searchText]);

  async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    setArticlesState(data.articles);
  }

  function onTopicClick(topic) {
    let searchQuery='';
    switch (topic) {
      case 'Home':
        searchQuery = 'Cricket'; 
        break;
      case 'Sports':
        searchQuery = 'Sports'; 
        break;
        case 'Finance':
        searchQuery = 'Finance'; 
        break;
      case 'Technology':
        searchQuery = 'Technology'; 
        break;
      case 'Bollywood':
        searchQuery = 'Bollywood'; 
        break;
      default:
        searchQuery = 'India'; 
        break;
    }
    fetchNews(searchQuery);
    
    setSelectedTopic(topic);
  }

  function onSearchButtonClick() {
    fetchNews(searchText || 'India');
    setSelectedTopic(null);
  }

  function onArticleClick(articleUrl) {
    setSelectedArticleUrl(articleUrl);
    setShowMiniBrowser(true);
    fetchNewsData(articleUrl);
  }

  const [miniBrowserLoading, setMiniBrowserLoading] = useState(false);

  async function fetchNewsData(articleUrl) {
    try {
      setMiniBrowserLoading(true); 
      const res = await fetch(`${url}?url=${articleUrl}&apiKey=${API_KEY}`);
      const data = await res.json();
      console.log(data);
      setMiniBrowserLoading(false); 
    } catch (error) {
      console.error('Error fetching news:', error);
      setMiniBrowserLoading(false); 
    }
  }

  

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <span className="navbar-brand me-auto">
            <b>News Aggregator</b>
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          > 
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto ms-4 mb-2 mb-lg-0 d-flex align-items-center">
              {topics.map((topic) => (
                <li className="nav-item" key={topic}>
                  <span
                    className={`nav-link ${selectedTopic === topic ? 'active' : ''}`}
                    onClick={() => onTopicClick(topic)}
                    href="#"
                  >
                    {topic}
                  </span>
                </li>
              ))}<li className="nav-item me-auto ms-3">
              <a class="git-link" href="https://github.com/aryanraj8158/Project_Aggregator">GitHub Link</a>
            </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button
                className="btn btn-outline-success"
                type="button"
                onClick={onSearchButtonClick}
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      <div className="container mt-3">
        <h1 className="text-center mb-3">Top News Headlines</h1>
        <div className="row justify-content-center">
          {articles.map((ele, index) => (
            <div
              key={index}
              className="card col-10 col-md-3 col-lg-3 m-5 hover-card"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                transition: "box-shadow 0.3s ease",
              }}
            >
              <img
                src={
                  ele.urlToImage == null ? "https://www.exchange4media.com/news-photo/100947-expresslogo.jpg?crop=0.383xw:0.383xh;0.517xw,0.252xh&resize=1200:*" : ele.urlToImage
                }
                className="card-img-top"
                alt="..." 
                style = {{ height: "200px", ObjectFit: "cover"}}/>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  {ele.title === "" ? "Top News" : ele.title}
                </h5>
                <p className="card-text">{ele.description}</p>
                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => onArticleClick(ele.url)}
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
        {showMiniBrowser && (
        <div
            style={{
            position: 'fixed',
            width: '500px',
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            zIndex: 9999,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: '2px', 
            borderRadius: '2px', 
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', 
            }}
        >
            <button
            onClick={() => setShowMiniBrowser(false)}
            style={{
                position: 'absolute',
                top: '5px', 
                right: '5px', 
                padding: '5px 10px', 
                borderRadius: '5px', 
                backgroundColor: 'white', 
                border: 'none', 
                cursor: 'pointer',
            }}
            >
            Close
            </button>
            {miniBrowserLoading ? (<p style={{backgroundColor: "#fbfbfb", height: "50px", fontSize: "1.5rem", textAlign: "center"}}>Loading...</p>) : (
            <iframe
            src={selectedArticleUrl}
            title="Mini Browser"
            style={{ width: '100%', height: 'calc(100vh - 100px)', border: 'none' }} 
            allow="fullscreen"
            />
            )}
        </div>
        )}

      </div>
    </div>
  );
};

export default HomePage;