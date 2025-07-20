import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function Bug() {
  const { id, bugId } = useParams();
  const [bug, setBug] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBug = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8080/api/bugs/${bugId}`);
        console.log(data);
        setBug(data);
        
      } catch (err) {
        setError("Failed to load bug");
      } finally {
        setLoading(false);
      }
    };
    fetchBug();
  }, [id, bugId]);
//   const imageUrl = bug ? `http://localhost:8080/screenshotPath` : '';

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!bug) return null;

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl text-black font-bold mb-4">Bug: {bug.title}</h1>
      <p className="mb-2">ID: {bug.id}</p>
      <p className="mb-6 text-black">Description: {bug.description}</p>
      <p className="mb-6 text-black">Status: {bug.status}</p>
      {bug.screenshotPath && (
        <div className="mb-6 w-full flex justify-center h-100">
          <img
            src={bug.screenshotPath}
            alt={bug.title}
            className="max-w-xs rounded shadow"
          />
        </div>
      )}
      <Link to={`/projects/${id}`} className="text-blue-600 hover:underline">Back to Project</Link>
    </div>
  );
}

export default Bug;