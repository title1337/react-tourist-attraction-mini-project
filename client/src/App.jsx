import { useEffect, useState } from "react";
import "./App.css";
import Title from "./components/title";
import Search from "./components/search";
import Display from "./components/display";

function App() {
  const [keywords, setKeywords] = useState("");
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      setLoading(true);
      setError("");

      try {
        const query = new URLSearchParams({ keywords });
        const response = await fetch(
          `http://localhost:4001/trips?${query.toString()}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error(`โหลดผลการค้นหาไม่สำเร็จ (${response.status})`);
        }

        const result = await response.json();
        setTrips(result.data);
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setTrips([]);
          setError(requestError.message || "ไม่สามารถโหลดผลการค้นหาได้");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 250);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [keywords]);

  return (
    <main className="App">
      <Title />
      <Search value={keywords} onChange={setKeywords} />
      {loading && <p className="display-status" role="status">กำลังค้นหา...</p>}
      {error && <p className="display-error" role="alert">{error}</p>}
      {!loading && !error && (
        <Display trips={trips} onTagClick={setKeywords} />
      )}
    </main>
  );
}

export default App;
