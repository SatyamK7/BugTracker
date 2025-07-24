import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Project() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const index = 0;// Added index state for bug ID tracking

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8080/api/projects/${id}`);
        setProject(data);
        
      } catch (err) {
        setError("Failed to load project");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleDeleteBug = async (bugId) => {
    try {
      await axios.delete(`http://localhost:8080/api/bugs/${bugId}`);
      setProject((prev) => ({
        ...prev,
        bugs: prev.bugs.filter((bug) => bug.id !== bugId),
      }));
    } catch (err) {
      setError("Failed to delete bug");
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!project) return null;

  return (
    <div className="p-8 text-black">
      <h1 className="text-2xl text-black font-bold mb-4">Project: {project.name}</h1>
      <p className="mb-2">ID: {project.id}</p>
      <p className="mb-6">Description: {project.description}</p>

      <h2 className="text-xl font-semibold mb-2">Bugs</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-gray-800 rounded-md overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Assigned To</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {project.bugs && project.bugs.length > 0 ? (
              project.bugs.map((bug, index) => (
                <tr key={bug.id} className="border-t border-gray-200 hover:bg-gray-100">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">
                    <Link to={`/projects/${id}/bugs/${bug.id}`} className="text-blue-600 hover:underline">
                      {bug.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{bug.status}</td>
                  <td className="px-6 py-4">{bug.assignedTo ? bug.assignedTo.name : "-"}</td>
                  <td className="px-4 py-3">
                    <button
                      className="text-white bg-red-600 px-4 py-2 rounded-md hover:bg-red-700"
                      onClick={() => handleDeleteBug(bug.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center">No bugs found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={() => navigate(`/projects/${id}/bugs/new`)}
        >
          Add Bug
        </button>
      </div>
    </div>
  );
}

export default Project;
