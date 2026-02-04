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
  {
    id: 6,
    englishQuestion: 'What is the plural of "child"?',
    hindiQuestion: '"Child" का बहुवचन क्या है?',
    options: [
      { id: 'a', englishText: 'Childs', hindiText: 'Childs' },
      { id: 'b', englishText: 'Childes', hindiText: 'Childes' },
      { id: 'c', englishText: 'Children', hindiText: 'Children' },
      { id: 'd', englishText: 'Childern', hindiText: 'Childern' },
    ],
    correctAnswer: 'c',
    points: 20,
  },
  {
    id: 7,
    englishQuestion: 'What does "ameliorate" mean?',
    hindiQuestion: '"Ameliorate" का अर्थ क्या है?',
    options: [
      { id: 'a', englishText: 'To make worse', hindiText: 'बदतर बनाना' },
      { id: 'b', englishText: 'To improve or make better', hindiText: 'सुधारना या बेहतर बनाना' },
      { id: 'c', englishText: 'To remain unchanged', hindiText: 'अपरिवर्तित रहना' },
      { id: 'd', englishText: 'To destroy completely', hindiText: 'पूरी तरह नष्ट करना' },
    ],
    correctAnswer: 'b',
    points: 20,
  },
  {
    id: 8,
    englishQuestion: 'Choose the correct form: "She ____ to the market every day."',
    hindiQuestion: 'सही रूप चुनें: "She ____ to the market every day."',
    options: [
      { id: 'a', englishText: 'go', hindiText: 'go' },
      { id: 'b', englishText: 'goes', hindiText: 'goes' },
      { id: 'c', englishText: 'going', hindiText: 'going' },
      { id: 'd', englishText: 'gone', hindiText: 'gone' },
    ],
    correctAnswer: 'b',
    points: 20,
  },
  {
    id: 9,
    englishQuestion: 'What is the antonym of "benevolent"?',
    hindiQuestion: '"Benevolent" का विलोम क्या है?',
    options: [
      { id: 'a', englishText: 'Kind and generous', hindiText: 'दयालु और उदार' },
      { id: 'b', englishText: 'Malevolent or wicked', hindiText: 'दुर्भावनापूर्ण या दुष्ट' },
      { id: 'c', englishText: 'Neutral and indifferent', hindiText: 'तटस्थ और उदासीन' },
      { id: 'd', englishText: 'Shy and quiet', hindiText: 'शर्मीला और शांत' },
    ],
    correctAnswer: 'b',
    points: 20,
  },
  {
    id: 10,
    englishQuestion: 'Fill in the blank: "This is ____ book you lent me."',
    hindiQuestion: 'रिक्त स्थान भरें: "This is ____ book you lent me."',
    options: [
      { id: 'a', englishText: 'a', hindiText: 'a' },
      { id: 'b', englishText: 'an', hindiText: 'an' },
      { id: 'c', englishText: 'the', hindiText: 'the' },
      { id: 'd', englishText: 'no article needed', hindiText: 'no article needed' },
    ],
    correctAnswer: 'c',
    points: 20,
  },
  {
    id: 11,
    englishQuestion: 'What does "ephemeral" mean?',
    hindiQuestion: '"Ephemeral" का अर्थ क्या है?',
    options: [
      { id: 'a', englishText: 'Lasting a very short time', hindiText: 'बहुत कम समय तक चलने वाली' },
      { id: 'b', englishText: 'Long-lasting and permanent', hindiText: 'दीर्घकालीन और स्थायी' },
      { id: 'c', englishText: 'Related to space', hindiText: 'अंतरिक्ष से संबंधित' },
      { id: 'd', englishText: 'Extremely complicated', hindiText: 'अत्यंत जटिल' },
    ],
    correctAnswer: 'a',
    points: 20,
  },
  {
    id: 12,
    englishQuestion: 'Choose the correct spelling:',
    hindiQuestion: 'सही वर्तनी चुनें:',
    options: [
      { id: 'a', englishText: 'Recieve', hindiText: 'Recieve' },
      { id: 'b', englishText: 'Receive', hindiText: 'Receive' },
      { id: 'c', englishText: 'Recieve', hindiText: 'Recieve' },
      { id: 'd', englishText: 'Recive', hindiText: 'Recive' },
    ],
    correctAnswer: 'b',
    points: 20,
  },
  {
    id: 13,
    englishQuestion: 'What is the correct past tense of "eat"?',
    hindiQuestion: '"Eat" का सही भूतकाल क्या है?',
    options: [
      { id: 'a', englishText: 'Eat', hindiText: 'Eat' },
      { id: 'b', englishText: 'Eated', hindiText: 'Eated' },
      { id: 'c', englishText: 'Ate', hindiText: 'Ate' },
      { id: 'd', englishText: 'Eating', hindiText: 'Eating' },
    ],
    correctAnswer: 'c',
    points: 20,
  },
  {
    id: 14,
    englishQuestion: 'What is a synonym for "diligent"?',
    hindiQuestion: '"Diligent" का पर्यायवाची क्या है?',
    options: [
      { id: 'a', englishText: 'Lazy and idle', hindiText: 'आलसी और निष्क्रिय' },
      { id: 'b', englishText: 'Hardworking and careful', hindiText: 'मेहनती और सावधान' },
      { id: 'c', englishText: 'Rude and impolite', hindiText: 'असभ्य और अशिष्ट' },
      { id: 'd', englishText: 'Confused and lost', hindiText: 'भ्रमित और खोया हुआ' },
    ],
    correctAnswer: 'b',
    points: 20,
  },
  {
    id: 15,
    englishQuestion: 'Complete: "I would prefer coffee ____ tea."',
    hindiQuestion: 'पूरा करें: "I would prefer coffee ____ tea."',
    options: [
      { id: 'a', englishText: 'to', hindiText: 'to' },
      { id: 'b', englishText: 'than', hindiText: 'than' },
      { id: 'c', englishText: 'over', hindiText: 'over' },
      { id: 'd', englishText: 'for', hindiText: 'for' },
    ],
    correctAnswer: 'a',
    points: 20,
  },
  {
    id: 16,
    englishQuestion: 'What does "pragmatic" mean?',
    hindiQuestion: '"Pragmatic" का अर्थ क्या है?',
    options: [
      { id: 'a', englishText: 'Based on practical experience', hindiText: 'व्यावहारिक अनुभव पर आधारित' },
      { id: 'b', englishText: 'Related to grammar', hindiText: 'व्याकरण से संबंधित' },
      { id: 'c', englishText: 'Completely theoretical', hindiText: 'पूरी तरह सैद्धांतिक' },
      { id: 'd', englishText: 'Very romantic', hindiText: 'बहुत रोमांटिक' },
    ],
    correctAnswer: 'a',
    points: 20,
  },
  {
    id: 17,
    englishQuestion: 'Choose the correct form: "Neither of them ____"',
    hindiQuestion: 'सही रूप चुनें: "Neither of them ____"',
    options: [
      { id: 'a', englishText: 'are', hindiText: 'are' },
      { id: 'b', englishText: 'is', hindiText: 'is' },
      { id: 'c', englishText: 'was', hindiText: 'was' },
      { id: 'd', englishText: 'were', hindiText: 'were' },
    ],
    correctAnswer: 'b',
    points: 20,
  },
  {
    id: 18,
    englishQuestion: 'What is the meaning of "vindicate"?',
    hindiQuestion: '"Vindicate" का अर्थ क्या है?',
    options: [
      { id: 'a', englishText: 'To accuse falsely', hindiText: 'झूठा आरोप लगाना' },
      { id: 'b', englishText: 'To support or defend successfully', hindiText: 'सफलतापूर्वक समर्थन या बचाव करना' },
      { id: 'c', englishText: 'To ignore completely', hindiText: 'पूरी तरह अनदेखा करना' },
      { id: 'd', englishText: 'To punish harshly', hindiText: 'कठोर दंड देना' },
    ],
    correctAnswer: 'b',
    points: 20,
  },
  {
    id: 19,
    englishQuestion: 'Fill in: "If it rains, we ____ go to the park."',
    hindiQuestion: 'भरें: "If it rains, we ____ go to the park."',
    options: [
      { id: 'a', englishText: 'will', hindiText: 'will' },
      { id: 'b', englishText: 'would', hindiText: 'would' },
      { id: 'c', englishText: "won't", hindiText: "won't" },
      { id: 'd', englishText: "wouldn't", hindiText: "wouldn't" },
    ],
    correctAnswer: 'c',
    points: 20,
  },
  {
    id: 20,
    englishQuestion: 'What is a synonym for "meticulous"?',
    hindiQuestion: '"Meticulous" का पर्यायवाची क्या है?',
    options: [
      { id: 'a', englishText: 'Very careless', hindiText: 'बहुत लापरवाह' },
      { id: 'b', englishText: 'Extremely careful and precise', hindiText: 'अत्यंत सावधान और सटीक' },
      { id: 'c', englishText: 'Somewhat confused', hindiText: 'थोड़ा भ्रमित' },
      { id: 'd', englishText: 'Very nervous', hindiText: 'बहुत घबराया हुआ' },
    ],
    correctAnswer: 'b',
    points: 20,
  },
  {
    id: 21,
    englishQuestion: 'Choose the correct form: "He ____ to school since morning."',
    hindiQuestion: 'सही रूप चुनें: "He ____ to school since morning."',
    options: [
      { id: 'a', englishText: 'is going', hindiText: 'is going' },
      { id: 'b', englishText: 'has been going', hindiText: 'has been going' },
      { id: 'c', englishText: 'was going', hindiText: 'was going' },
      { id: 'd', englishText: 'went', hindiText: 'went' },
    ],
    correctAnswer: 'b',
    points: 20,
  },
  {
    id: 22,
    englishQuestion: 'What does "perspicacious" mean?',
    hindiQuestion: '"Perspicacious" का अर्थ क्या है?',
    options: [
      { id: 'a', englishText: 'Related to sweating', hindiText: 'पसीने से संबंधित' },
      { id: 'b', englishText: 'Having keen insight or understanding', hindiText: 'तीव्र अंतर्दृष्टि या समझ रखना' },
      { id: 'c', englishText: 'Very nervous and anxious', hindiText: 'बहुत घबराया हुआ और चिंतित' },
      { id: 'd', englishText: 'Unwilling to listen', hindiText: 'सुनने के लिए अनिच्छुक' },
    ],
    correctAnswer: 'b',
    points: 20,
  },
  {
    id: 23,
    englishQuestion: 'Select the correctly spelled word:',
    hindiQuestion: 'सही तरीके से स्पेल किया गया शब्द चुनें:',
    options: [
      { id: 'a', englishText: 'Occured', hindiText: 'Occured' },
      { id: 'b', englishText: 'Occurred', hindiText: 'Occurred' },
      { id: 'c', englishText: 'Occured', hindiText: 'Occured' },
      { id: 'd', englishText: 'Ocured', hindiText: 'Ocured' },
    ],
    correctAnswer: 'b',
    points: 20,
  },
  {
    id: 24,
    englishQuestion: 'What is the meaning of "obfuscate"?',
    hindiQuestion: '"Obfuscate" का अर्थ क्या है?',
    options: [
      { id: 'a', englishText: 'To make clear and simple', hindiText: 'स्पष्ट और सरल बनाना' },
      { id: 'b', englishText: 'To make obscure or unclear', hindiText: 'अस्पष्ट या अस्पष्ट बनाना' },
      { id: 'c', englishText: 'To decorate beautifully', hindiText: 'सुंदर तरीके से सजाना' },
      { id: 'd', englishText: 'To organize systematically', hindiText: 'व्यवस्थित तरीके से संगठित करना' },
    ],
    correctAnswer: 'b',
    points: 20,
  },
  {
    id: 25,
    englishQuestion: 'Complete: "She wishes she ____ more time to study."',
    hindiQuestion: 'पूरा करें: "She wishes she ____ more time to study."',
    options: [
      { id: 'a', englishText: 'have', hindiText: 'have' },
      { id: 'b', englishText: 'has', hindiText: 'has' },
      { id: 'c', englishText: 'had', hindiText: 'had' },
      { id: 'd', englishText: 'has had', hindiText: 'has had' },
    ],
    correctAnswer: 'c',
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
