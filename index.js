export default async function handler(req, res) {
  const { cidade, nicho } = req.query;

  if (!cidade || !nicho) {
    return res.status(400).json({
      erro: "Informe cidade e nicho"
    });
  }

  const apiKey = process.env.GOOGLE_API_KEY;

  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
    nicho + " em " + cidade
  )}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const resultados = data.results.map((empresa) => ({
      nome: empresa.name,
      endereco: empresa.formatted_address,
      rating: empresa.rating || null
    }));

    res.status(200).json(resultados);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar empresas" });
  }
}
