export default async function handler(req, res) {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ error: "url eksik kanka" });
  }

  try {
    const response = await fetch(`https://instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com/?url=${encodeURIComponent(targetUrl)}`, {
      method: "GET",
      headers: {
        "X-Rapidapi-Key": "2a43b027aemshfb4b7300fc9be83p10f425jsnf2c3f16a5cc3",
        "X-Rapidapi-Host": "instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com"
      }
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("Hata var kanka:", err);
    res.status(500).json({ error: "İstek patladı amk" });
  }
}
