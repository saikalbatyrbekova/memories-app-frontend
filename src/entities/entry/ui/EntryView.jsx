// src/entities/entry/components/EntryView.jsx
import React from 'react';

const EntryView = ({ entry }) => {
  return (
    <div>
      <h3>{entry.title}</h3>
      <p>{entry.content}</p>
      {entry.image && (
        <img
          src={entry.image.url}
          alt="Thumbnail"
          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
        />
      )}
    </div>
  );
};

export default EntryView;
