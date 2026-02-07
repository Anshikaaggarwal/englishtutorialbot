const express = require('express');
const axios = require('axios');

const router = express.Router();

const CATEGORIES = [
  'wordle',
  'sports',
  'animals',
  'birds',
  'softwares',
  'companies',
  'brainrot',
];

router.get('/random', async (req, res) => {
  try {
    const category =
      CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];

    const apiRes = await axios.get(
      `https://random-words-api.kushcreates.com/api?language=en&category=${category}`
    );

    const words = apiRes.data;

    if (!Array.isArray(words) || words.length === 0) {
      return res.status(404).json({ error: 'No words found' });
    }

    const featuredWord = words[0].word;

    let meaning = '';
    let example = '';

    try {
      const dictRes = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(featuredWord)}`
      );

      const entry = dictRes.data[0];
      meaning = entry.meanings[0].definitions[0].definition;
      example = entry.meanings[0].definitions[0].example || '';
    } catch {
      meaning = 'Meaning not available';
      example = '';
    }

    res.json({
      category,
      featuredWord,
      meaning,
      example,
      allWords: words.map((w) => w.word),
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch vocabulary' });
  }
});

router.get('/meaning/:word', async (req, res) => {
  try {
    const word = req.params.word;

    const dictRes = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`
    );

    const entry = dictRes.data[0];
    const definition = entry.meanings[0].definitions[0].definition;
    const example = entry.meanings[0].definitions[0].example || '';

    res.json({
      word,
      meaning: definition,
      example,
    });
  } catch {
    res.json({
      word: req.params.word,
      meaning: 'Meaning not available',
      example: '',
    });
  }
});


module.exports = router;
