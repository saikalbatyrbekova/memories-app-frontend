import { useState } from 'react';
import { entryApi } from '@entities/entry/api/entryApi';

const EntriesList = () => {
  const [entries, setEntries] = useState([]); // Replace with API call to fetch entries
  const [confirmDelete, setConfirmDelete] = useState(null); // Entry to confirm delete

  const handleDelete = async () => {
    try {
      await entryApi.deleteEntry(confirmDelete);
      setEntries((prev) => prev.filter((entry) => entry.id !== confirmDelete));
      setConfirmDelete(null); // Close the modal
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      {entries.map((entry) => (
        <div key={entry.id} className="entry">
          <h3>{entry.title}</h3>
          <button onClick={() => setConfirmDelete(entry.id)}>Delete</button>
        </div>
      ))}

      {confirmDelete && (
        <div className="modal">
          <p>Are you sure you want to delete this entry?</p>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={() => setConfirmDelete(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};
useEffect(() => {
    const fetchEntries = async () => {
      try {
        const data = await entryApi.getEntries();
        setEntries(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchEntries();
  }, []);

  return (
    <div>
      {entries.length === 0 ? (
        <p>No entries found</p>
      ) : (
        entries.map((entry) => (
          <div key={entry.id} className="entry">
            <h3>{entry.title}</h3>
            <p>{entry.content}</p>
            <button onClick={() => navigate(`/entries/edit/${entry.id}`)}>
              Edit
            </button>
            <button onClick={() => setConfirmDelete(entry.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );

export default EntriesList;
