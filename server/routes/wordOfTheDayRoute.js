import { Router } from 'express';
import { translate } from '@vitalets/google-translate-api';

const router = Router();

router.get('/word-of-the-day', async (req, res) => {
  const apiRes = await fetch('https://wordoftheday.freeapi.me/');
  const data = await apiRes.json();

  const hindiMeaning = await translate(data.meaning, { to: 'hi' });
  const hindiExample = data.example
    ? await translate(data.example, { to: 'hi' })
    : { text: '' };

  res.json({
    word: data.word,
    meaning: data.meaning,
    hindiMeaning: hindiMeaning.text,
    partOfSpeech: data.partOfSpeech,
    example: data.example ?? '',
    hindiExample: hindiExample.text,
  });
});

export default router;
