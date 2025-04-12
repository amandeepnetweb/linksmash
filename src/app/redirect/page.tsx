"use client";

import { useEffect, useState } from "react";

const Redirect = () => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encodedScheme = params.get("scheme");
    const encodedFallback = params.get("fallback");

    if (!encodedScheme || !encodedFallback) {
      setError("Missing scheme or fallback");
      return;
    }

    try {
      const scheme = atob(encodedScheme);
      const fallback = atob(encodedFallback);

      // Try to open the app
      window.location.href = scheme;

      // Fallback after 1.5 seconds
      const timeout = setTimeout(() => {
        window.location.href = fallback;
      }, 1500);

      return () => clearTimeout(timeout);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to decode link");
      }
    }
  }, []);

  return (
    <div className="p-4 text-center text-gray-700 text-lg">
      {error ? <p>{error}</p> : <p>Opening app...</p>}
    </div>
  );
};

export default Redirect;
