import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);

  const fetchVideo = async () => {
    const res = await fetch(`/api/get?url=${encodeURIComponent(url)}`);
    const json = await res.json();
    setData(json);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Sosyal Medya Video İndirici</h1>
      <input
        value={url}
        onChange={e => setUrl(e.target.value)}
        placeholder="Linki gir reis"
        style={{ width: "300px", padding: "8px" }}
      />
      <button onClick={fetchVideo} style={{ marginLeft: 10 }}>İndir</button>

      {data && (
        <div style={{ marginTop: 20 }}>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          {data.video && <video src={data.video} controls width="400" />}
        </div>
      )}
    </div>
  );
}
