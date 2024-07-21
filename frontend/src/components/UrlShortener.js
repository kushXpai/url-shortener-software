import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UrlHistory from './UrlHistory';
import './UrlShortener.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

function UrlShortener() {
    const [url, setUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get('http://localhost:8001/url/history');
                setHistory(response.data);
            } catch (error) {
                console.error('Error fetching history:', error);
            }
        };
        fetchHistory();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8001/url', { url });
            setShortUrl(`http://localhost:8001/${response.data.id}`);

            // Fetch updated history
            const updatedHistory = await axios.get('http://localhost:8001/url/history');
            setHistory(updatedHistory.data);
        } catch (error) {
            console.error('Error shortening URL:', error);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrl);
        alert('URL copied to clipboard');
    };

    return (
        <div className="url-shortener">
            <form onSubmit={handleSubmit} className="url-form">
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Shorten a link here..."
                    required
                />
                <button type="submit">Shorten it!</button>
            </form>
            {shortUrl && (
                <div className="short-url-container">
                    <p>Short URL:
                        <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
                        <FontAwesomeIcon icon={faCopy} onClick={handleCopy} className="copy-icon" />
                    </p>
                </div>
            )}
            <section className="advanced-statistics">
                <h2>Advanced Statistics</h2>
                <p>Track how many clicks your shortened URLs receive and measure their performance.</p>
            </section>
            <UrlHistory history={history} />
        </div>
    );
}

export default UrlShortener;
