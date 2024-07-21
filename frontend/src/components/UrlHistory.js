import React from 'react';
import './UrlHistory.css';

function UrlHistory({ history }) {
  return (
    <div className="url-history">
      <table className="history-table">
        <thead>
          <tr>
            <th>Original URL</th>
            <th>Short URL</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item, index) => (
            <tr key={index}>
              <td>{item.originalUrl}</td>
              <td><a href={item.shortUrl}>{item.shortUrl}</a></td>
              <td>{item.clicks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UrlHistory;
