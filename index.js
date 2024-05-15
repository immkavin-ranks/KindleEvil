import express from "express";
import axios from "axios";

const app = express();
const PORT = 3000;

app.use(express.static("public"))

app.get("/", async (req, res) => {
  try {
    const response1 = await axios.get("https://meme-api.com/gimme");
    const result1 = response1.data;
    const response2 = await axios.get(
      "https://evilinsult.com/generate_insult.php?type=json"
    );
    const result2 = response2.data;
    res.render("index.ejs", {
      memeTitle: result1.title,
      memeUrl: result1.preview.slice(-1),
      insult: result2.insult,
      creator: result2.createdby,
    });
  } catch (error) {
    console.error(error.message);
    res.render("/", {error: error.message})
  }
});

app.listen(PORT, () => {
  console.log(`Application running on port ${PORT}`);
});
