import fetch from "node-fetch";

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "url eksik kanka" });

  try {
    const response = await fetch(
      `https://instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com/?url=${encodeURIComponent(url)}`,
      {
        method: "GET",
        headers: {
          "X-Rapidapi-Key": process.env.key,
          "X-Rapidapi-Host": "instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "bi şeyler bozuldu amk" });
  }
}
