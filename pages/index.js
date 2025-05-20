import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVideo = async () => {
    if (!url) return alert("Linki gir amk");
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await fetch(`/api/get?url=${encodeURIComponent(url)}`);
      if (!res.ok) throw new Error("API hata verdi amk");
      const json = await res.json();
      setData(json);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Sosyal Medya Video İndirici</h1>
      <input
        value={url}
        onChange={e => setUrl(e.target.value)}
        placeholder="Linki gir reis"
        style={{ width: 300, padding: 8 }}
      />
      <button onClick={fetchVideo} style={{ marginLeft: 10 }}>
        {loading ? "Bekle amk..." : "İndir"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && (
        <div style={{ marginTop: 20 }}>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          {data.video && <video src={data.video} controls width="400" />}
        </div>
      )}
    </div>
  );
}
