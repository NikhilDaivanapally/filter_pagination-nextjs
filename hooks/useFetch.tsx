"use client";

import { useState } from "react";

const useFetch = () => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState<null | boolean>(null);
  const [error, setError] = useState<null | string>(null);

  const fn = async (url: string) => {
    console.log("Base URL:", url);

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setData(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn };
};

export default useFetch;
