import { Shield, TrendingUp, Zap } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { createShortlink } from "../../service/shortLinkService";
import { useOutletContext } from "react-router-dom";

function Landing() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const { setLoading } = useOutletContext();

  const handleShorten = async () => {
    if (!longUrl) return;

    setLoading(true);
    try {
      const res = await createShortlink(longUrl);
      await new Promise((r) => setTimeout(r, 800));

      setShortUrl(res.results.short_url);
      toast.success("Short link created Successfully");
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan!, Coba lagi nanti");
    } finally {
      setLoading(false);
    }
  };
  const handleCopy = async () => {
    if (!shortUrl) return;

    setLoading(true);
    try {
      await navigator.clipboard.writeText(shortUrl);
      await new Promise((r) => setTimeout(r, 500));
      toast.info("Short URL copied to clipboard!");
    } catch {
      toast.error("Failed to copy URL");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Shorten Your Links,
              <br />
              <span className="text-blue-600">Amplify Your Reach</span>
            </h1>
            <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto mt-6">
              Create short, memorable links in seconds. Track clicks, manage
              campaigns, and optimize your digital presence.
            </p>
          </div>

          {/* Input Section */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-4xl mx-auto mb-8">
            <input
              type="text"
              placeholder="Enter your long URL here..."
              className="flex-1 px-6 py-4 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
            />
            <button
              className="cursor-pointer bg-blue-600 text-white px-8 py-4 rounded-lg font-medium text-base whitespace-nowrap"
              onClick={handleShorten}
            >
              Shorten
            </button>
          </div>

          {/* Result Section */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <p className="text-sm text-gray-500 text-center mb-4">
                Your shortened URL:
              </p>
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <input
                  type="text"
                  value={shortUrl}
                  readOnly
                  placeholder="Your short URL"
                  className="flex-1 w-full px-6 py-3 text-base border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
                />
                <button
                  className="cursor-pointer bg-gray-900 text-white px-8 py-3 rounded-lg font-medium text-base whitespace-nowrap"
                  onClick={handleCopy}
                  disabled={!shortUrl}
                >
                  Copy
                </button>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Lightning Fast
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Generate short links instantly and share them across all your
                platforms in seconds.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Advanced Analytics
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Track every click with detailed analytics and insights to
                optimize your campaigns.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Secure & Reliable
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Your links are protected with enterprise-grade security and
                99.9% uptime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
