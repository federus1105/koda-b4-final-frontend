import React, { useCallback, useEffect, useState } from "react";
import {
  Search,
  Filter,
  Copy,
  ExternalLink,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Inbox,
} from "lucide-react";
import { deleteShortlink, getListLink } from "../../service/linkService";
import { toast } from "react-toastify/unstyled";
import { useOutletContext } from "react-router-dom";
import ConfirmModal from "../../components/modal/ConfirmModal";

function Link() {
  const [searchInput, setSearchInput] = useState("");
  const { setLoading } = useOutletContext();
  const [search, setSearch] = useState("");
  const [links, setLinks] = useState([]);
  const [page, setPage] = useState(1);
  const [deleting, setDeleting] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState(null);

  // --- GET DATA ---
  const fetchLinks = useCallback(
    async (pg = page, sc = search) => {
      setLoading(true);
      setLinks([]);

      try {
        const res = await getListLink({ page: pg, search: sc });
        await new Promise((r) => setTimeout(r, 500));

        const mapped = res.results.map((item) => ({
          shortCode: item.short_url,
          shortUrl: `${import.meta.env.VITE_SHORT_URL}/${item.short_url}`,
          destination: item.destination,
          visits: item.visit,
          created: new Date(item.created_at).toLocaleDateString(),
          status: item.status ? "active" : "inactive",
        }));

        setLinks(mapped);
      } catch (err) {
        console.log(err);
        toast.error("Terjadi kesalahan! coba lagi nanti");
      } finally {
        setLoading(false);
      }
    },
    [page, search, setLoading]
  );
  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  // --- HANDLE DELETE ---
  const handleDelete = async () => {
    if (!selectedCode) return;
    setDeleting(selectedCode);

    try {
      await deleteShortlink(selectedCode);
      await new Promise((r) => setTimeout(r, 500));
      toast.success("Berhasil dihapus!");
      await fetchLinks();
    } catch (err) {
      console.log(err);
      toast.error("Gagal menghapus! Coba lagi nanti");
    } finally {
      setDeleting(null);
      setSelectedCode(null);
      setConfirmOpen(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Link Management
            </h1>
            <p className="text-gray-600">
              Browse, search, and manage all your shortened links.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search links..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => {
                  setLoading(true);
                  setLinks([]);
                  setSearch(searchInput);
                }}
                className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
              >
                <Filter className="w-4 h-4" />
                Search
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {links.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Inbox />
                <h3 className="text-xl font-semibold text-gray-800">
                  No data found
                </h3>
                <p className="text-gray-500 mt-1">
                  Try adjusting your search or filters.
                </p>
              </div>
            ) : (
              <>
                {/* Table content */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Short URL
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Destination
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Visits
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Created
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {links.map((link, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <span className="text-blue-600 font-medium">
                                {link.shortUrl}
                              </span>
                              <button className="cursor-pointer text-gray-400 hover:text-gray-600">
                                <Copy className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-900">
                                {link.destination}
                              </span>
                              <button className="cursor-pointer text-gray-400 hover:text-gray-600">
                                <ExternalLink className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                            {link.visits}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                            {link.created}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                                link.status === "active"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {link.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              className="cursor-pointer text-red-600 hover:text-red-700"
                              onClick={() => {
                                setSelectedCode(link.shortCode);
                                setConfirmOpen(true);
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                  <div className="text-sm text-gray-600">Showing results</div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 text-sm text-gray-700">
                      Page {page}
                    </span>
                    <button className="p-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={confirmOpen}
        title="Hapus Shortlink"
        message="Apakah Anda yakin ingin menghapus shortlink ini?"
        onCancel={() => {
          setConfirmOpen(false);
          setSelectedCode(null);
        }}
        onConfirm={handleDelete}
        confirmText="Hapus"
        cancelText="Batal"
      />
    </>
  );
}
export default Link;
