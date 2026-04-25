import { useState, useEffect, useCallback } from 'react';

// Define the type for the browser API (it's not in standard TS by default)
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionError extends Event {
  error: string;
}

export const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.continuous = false; // Stop after one sentence
      recog.interimResults = false; // Only final results
      recog.lang = 'en-US';

      recog.onstart = () => setIsListening(true);
      
      recog.onend = () => setIsListening(false);
      
      recog.onresult = (event: SpeechRecognitionEvent) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
      };

      recog.onerror = (event: SpeechRecognitionError) => {
  if (event.error === 'no-speech') {
    // Normal behavior: user didn’t speak
    setIsListening(false);
    return;
  }

  console.error('Speech recognition error:', event.error);
  setIsListening(false);
};

      setRecognition(recog);
    }
  }, []);

  const startListening = useCallback(() => {
    if (recognition) {
      setTranscript(''); // Clear previous
      recognition.start();
    } else {
      alert("Your browser doesn't support speech recognition. Try Chrome or Edge.");
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
    }
  }, [recognition]);

  return { isListening, transcript, startListening, stopListening, setTranscript };
};