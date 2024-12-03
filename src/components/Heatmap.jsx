import React, { useState, useEffect } from 'react';
import "react-calendar-heatmap/dist/styles.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import "./Heatmap-styles.css";


const Heatmap = ({ data }) => {
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, content: '' });

  if (!data || !data.length) {
    return <div>No data available</div>;
  }

  const handleMouseEnter = (e, content) => {
    setTooltip({ visible: true, x: e.pageX, y: e.pageY, content });
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false });
  };

  const groupedByMonth = data.reduce((acc, item) => {
    const month = new Date(item.date).toLocaleString('default', { month: 'long' });
    if (!acc[month]) acc[month] = [];
    acc[month].push(item);
    return acc;
  }, {});

  const getColorClass = (totalSongs) => {
    if (totalSongs === 0) return 'color-empty';
    if (totalSongs < 50) return 'color-scale-1';
    if (totalSongs < 100) return 'color-scale-2';
    if (totalSongs < 150) return 'color-scale-3';
    return 'color-scale-4';
  };

  return (
    <div className="heatmap-months">
      <h2>Isabel's Spotify Heatmap for 2024</h2>
      {Object.entries(groupedByMonth).map(([month, days]) => (
        <div className="heatmap-month" key={month}>
          <h3>{month}</h3>
          <div className="heatmap-grid">
            {days.map((day) => (
              <div
                key={day.date}
                className={`heatmap-cell ${getColorClass(day.total_songs)}`}
                onMouseEnter={(e) =>
                  handleMouseEnter(e, `
                    <strong>Date:</strong> ${new Date(day.date).toDateString()}<br/>
                    <strong>Most Played Song:</strong> ${day.most_played_song} (${day.most_played_count})<br/>
                    <strong>Top Artist:</strong> ${day.artist || 'N/A'}
                  `)
                }
                onMouseLeave={handleMouseLeave}
              ></div>
            ))}
          </div>
        </div>
      ))}
      {tooltip.visible && (
        <div
          className="custom-tooltip"
          style={{
            left: tooltip.x + 10 + 'px',
            top: tooltip.y + 10 + 'px',
            display: 'block',
          }}
          dangerouslySetInnerHTML={{ __html: tooltip.content }}
        ></div>
      )}
    </div>
  );
};

export default Heatmap;


