import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Project() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!project) return null;

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl text-black font-bold mb-4">Project: {project.name}</h1>
      <p className="mb-2">ID: {project.id}</p>
      <p className="mb-6 text-black">Description: {project.description}</p>

      <h2 className="text-xl font-semibold mb-2">Bugs</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-gray-800 rounded-md overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Description</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Assigned To</th>
            </tr>
          </thead>
          <tbody>
            {project.bugs && project.bugs.length > 0 ? (
              project.bugs.map((bug) => (
                <tr key={bug.id} className="border-t border-gray-200 hover:bg-gray-100">
                  <td className="px-6 py-4">{bug.id}</td>
                  <td className="px-6 py-4">
                    <Link to={`/bugs/${bug.id}`} className="text-blue-600 hover:underline">
                      {bug.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4">{bug.description}</td>
                  <td className="px-6 py-4">{bug.status}</td>
                  <td className="px-6 py-4">{bug.assignedTo ? bug.assignedTo.name : "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center">No bugs found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Project;