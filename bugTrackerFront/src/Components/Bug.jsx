import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function Bug() {
  const { id, bugId } = useParams();
  const [bug, setBug] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchBug = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8080/api/bugs/${bugId}`);
        setBug(data);
        setStatus(data.status);
      } catch (err) {
        setError("Failed to load bug");
      } finally {
        setLoading(false);
      }
    };
    fetchBug();
  }, [id, bugId]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    try {
      await axios.patch(`http://localhost:8080/api/bugs/${bugId}`, { status: newStatus });
      setBug((prev) => ({ ...prev, status: newStatus }));
    } catch (err) {
      setError("Failed to update status");
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!bug) return null;

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl text-black font-bold mb-4">Bug: {bug.title}</h1>
      <p className="mb-2">ID: {bug.id}</p>
      <p className="mb-6 text-black">Description: {bug.description}</p>
      <div className="mb-6 text-black flex items-center gap-2">
        <span>Status:</span>
        <select
          value={status}
          onChange={handleStatusChange}
          className="px-2 py-1 rounded border border-gray-300 text-black"
        >
          <option value="OPEN">OPEN</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="RESOLVED">RESOLVED</option>
          <option value="CLOSED">CLOSED</option>
        </select>
      </div>
      {bug.screenshotPath && (
        <div className="mb-6 w-full flex justify-center h-100">
          <img
            src={`http://localhost:8080/${bug.screenshotPath}`}
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