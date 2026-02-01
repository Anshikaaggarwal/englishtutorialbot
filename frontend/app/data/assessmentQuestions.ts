export interface AssessmentQuestion {
  id: number;
  englishQuestion: string;
  hindiQuestion: string;
  options: Array<{
    id: string;
    englishText: string;
    hindiText: string;
  }>;
  correctAnswer: string;
  points: number;
}

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 1,
    englishQuestion: 'What does "eloquent" mean?',
    hindiQuestion: '"Eloquent" का अर्थ क्या है?',
    options: [
      { id: 'a', englishText: 'Fluent and expressive in speaking or writing', hindiText: 'बोलने या लिखने में प्रवाहमान और अभिव्यक्त' },
      { id: 'b', englishText: 'Silent and quiet', hindiText: 'मौन और शांत' },
      { id: 'c', englishText: 'Angry and aggressive', hindiText: 'गुस्सैल और आक्रामक' },
      { id: 'd', englishText: 'Confused and unclear', hindiText: 'भ्रमित और अस्पष्ट' },
    ],
    correctAnswer: 'a',
    points: 20,
  },
  {
    id: 2,
    englishQuestion: 'Complete the sentence: "If I ____ known about the party, I would have gone."',
    hindiQuestion: 'वाक्य को पूरा करें: "अगर मुझे पार्टी के बारे में ____ होता, तो मैं जाता।"',
    options: [
      { id: 'a', englishText: 'have', hindiText: 'have' },
      { id: 'b', englishText: 'had', hindiText: 'had' },
      { id: 'c', englishText: 'will have', hindiText: 'will have' },
      { id: 'd', englishText: 'would have', hindiText: 'would have' },
    ],
    correctAnswer: 'b',
    points: 20,
  },
  {
    id: 3,
    englishQuestion: 'What is a synonym for "ubiquitous"?',
    hindiQuestion: '"Ubiquitous" का पर्यायवाची क्या है?',
    options: [
      { id: 'a', englishText: 'Rare and uncommon', hindiText: 'दुर्लभ और असामान्य' },
      { id: 'b', englishText: 'Present everywhere', hindiText: 'हर जगह मौजूद' },
      { id: 'c', englishText: 'Very large', hindiText: 'बहुत बड़ा' },
      { id: 'd', englishText: 'Difficult to understand', hindiText: 'समझना मुश्किल' },
    ],
    correctAnswer: 'b',
    points: 20,
  },
  {
    id: 4,
    englishQuestion: 'Choose the correctly spelled word:',
    hindiQuestion: 'सही तरीके से स्पेल किया गया शब्द चुनें:',
    options: [
      { id: 'a', englishText: 'Occassion', hindiText: 'Occassion' },
      { id: 'b', englishText: 'Ocassion', hindiText: 'Ocassion' },
      { id: 'c', englishText: 'Occasion', hindiText: 'Occasion' },
      { id: 'd', englishText: 'Ocasion', hindiText: 'Ocasion' },
    ],
    correctAnswer: 'c',
    points: 20,
  },
  {
    id: 5,
    englishQuestion: 'What is the meaning of "procrastinate"?',
    hindiQuestion: '"Procrastinate" का अर्थ क्या है?',
    options: [
      { id: 'a', englishText: 'To work hard', hindiText: 'कठोर परिश्रम करना' },
      { id: 'b', englishText: 'To delay or postpone', hindiText: 'देरी करना या स्थगित करना' },
      { id: 'c', englishText: 'To plan carefully', hindiText: 'सावधानी से योजना बनाना' },
      { id: 'd', englishText: 'To celebrate', hindiText: 'मनाना' },
    ],
    correctAnswer: 'b',
    points: 20,
  },
];

export function calculateUserLevel(score: number): 'beginner' | 'intermediate' | 'advanced' {
  // Score out of 100
  if (score <= 40) {
    return 'beginner';
  } else if (score <= 70) {
    return 'intermediate';
  } else {
    return 'advanced';
  }
}
