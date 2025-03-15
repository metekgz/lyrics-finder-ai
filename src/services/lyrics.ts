const API_URL = "https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2";

export interface SearchResult {
  title: string;
  artist: string;
  confidence: number;
}

export async function searchLyrics(lyrics: string): Promise<SearchResult[]> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${import.meta.env.VITE_HUGGING_FACE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: {
        source_sentence: lyrics,
        sentences: [
          "Seni seviyorum diyen gözlerin",
          "Yağmur yağıyor şehrime",
          "Bir kış masalı gibisin",
          "Aşk laftan anlamaz ki"
        ]
      }
    }),
  });

  if (!response.ok) {
    console.error('API Hatası:', await response.text());
    throw new Error('API çağrısı başarısız oldu');
  }

  const data = await response.json();
  
  // Örnek şarkı verileri
  const sampleSongs = [
    { title: "Seni Seviyorum", artist: "Sezen Aksu" },
    { title: "Yağmur", artist: "Tarkan" },
    { title: "Kış Masalı", artist: "Teoman" },
    { title: "Aşk Laftan Anlamaz", artist: "Yıldız Tilbe" }
  ];

  // API'den gelen benzerlik skorlarını şarkılarla eşleştir
  return data.map((score: number, index: number) => ({
    title: sampleSongs[index].title,
    artist: sampleSongs[index].artist,
    confidence: score
  })).sort((a: SearchResult, b: SearchResult) => b.confidence - a.confidence);
} 