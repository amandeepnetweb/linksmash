"use client";

import React, { useState } from "react";
import { mapLinkToScheme } from "@/lib/linkMapper";

function App() {
  const [universalLink, setUniversalLink] = useState("");
  const [shareableLink, setShareableLink] = useState("");
  const [scheme, setScheme] = useState("");
  const [appName, setAppName] = useState("");
  const [error, setError] = useState("");

  // Base URL for redirect page (update for production)
  const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setShareableLink("");
    setScheme("");
    setAppName("");

    const result = mapLinkToScheme(universalLink);
    if (result.error) {
      setError(result.error);
      return;
    }

    try {
      if (!result.scheme || !result.universalLink) {
        throw new Error("Invalid scheme or universal link");
      } // Encode scheme and universal link
      const encodedScheme = btoa(result.scheme);
      const encodedUniversal = btoa(result.universalLink);

      // Generate shareable link
      const shareableLink = `${BASE_URL}/redirect?scheme=${encodeURIComponent(
        encodedScheme
      )}&fallback=${encodeURIComponent(encodedUniversal)}`;

      setShareableLink(shareableLink);
      setScheme(result.scheme);
      setAppName(result.appName);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
      // Handle the case where the error is not an instance of Error
      setError("Failed to generate link");
    }
  };

  return (
    <div className="App">
      <h1>LinkSmash</h1>
      <p>Paste a Universal Link to generate a direct app link.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={universalLink}
          onChange={(e) => setUniversalLink(e.target.value)}
          placeholder="e.g., https://www.instagram.com/nasa/"
          required
        />
        <button type="submit">Generate Link</button>
      </form>
      {error && <p className="error">{error}</p>}
      {appName && (
        <div className="result">
          <p>
            <strong>App:</strong> {appName}
          </p>
          <p>
            <strong>Scheme:</strong> {scheme}
          </p>
        </div>
      )}
      {shareableLink && (
        <div className="result">
          <p>
            <strong>Shareable Link:</strong>
          </p>
          <a href={shareableLink} target="_blank" rel="noopener noreferrer">
            {shareableLink}
          </a>
          <p className="note">
            Click to test or share this link to open the app directly.
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
