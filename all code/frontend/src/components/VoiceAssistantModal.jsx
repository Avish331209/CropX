import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Mic, MicOff, Volume2, X, Check, Sparkles, RefreshCw } from 'lucide-react';

export const VoiceAssistantModal = ({ isOpen, onClose, onParsedResult }) => {
  const { language, t, speakText } = useApp();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [parsedData, setParsedData] = useState(null);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = true;
      rec.lang = language === 'ta' ? 'ta-IN' : 'en-US';

      rec.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
        parseVoiceInput(currentTranscript);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      setRecognition(rec);
    }
  }, [language]);

  const parseVoiceInput = (text) => {
    const lower = text.toLowerCase();
    let name = "Fresh Produce";
    let price = 40;
    let qty = 100;

    if (lower.includes("tomato") || lower.includes("தக்காளி")) name = "Tomato";
    else if (lower.includes("onion") || lower.includes("வெங்காயம்")) name = "Onion";
    else if (lower.includes("potato") || lower.includes("உருளைக்கிழங்கு")) name = "Potato";
    else if (lower.includes("rice") || lower.includes("அரிசி")) name = "Sona Masoori Rice";
    else if (lower.includes("mango") || lower.includes("மாம்பழம்")) name = "Mango";
    else if (lower.includes("turmeric") || lower.includes("மஞ்சள்")) name = "Turmeric";
    else if (lower.includes("chilli") || lower.includes("மிளகாய்")) name = "Green Chilli";
    else if (lower.includes("banana") || lower.includes("வாழைப்பழம்")) name = "Banana";

    // Price regex extraction
    const priceMatch = lower.match(/(\d+)\s*(rupees|rs|ரூபாய்)/i) || lower.match(/(forty|thirty|fifty|sixty|hundred|நூறு|நாற்பது)/i);
    if (priceMatch) {
      if (priceMatch[1] && !isNaN(priceMatch[1])) price = Number(priceMatch[1]);
      else if (lower.includes("forty") || lower.includes("நாற்பது")) price = 40;
      else if (lower.includes("thirty") || lower.includes("முப்பது")) price = 30;
      else if (lower.includes("fifty") || lower.includes("ஐம்பது")) price = 50;
      else if (lower.includes("sixty") || lower.includes("அறுபது")) price = 60;
    }

    // Quantity regex extraction
    const qtyMatch = lower.match(/(\d+)\s*(kg|kilogram|கிலோ)/i);
    if (qtyMatch && qtyMatch[1]) {
      qty = Number(qtyMatch[1]);
    } else if (lower.includes("hundred") || lower.includes("நூறு")) {
      qty = 100;
    } else if (lower.includes("fifty") || lower.includes("ஐம்பது")) {
      qty = 50;
    }

    setParsedData({ name, price, availableQty: qty });
  };

  const startListening = () => {
    setTranscript('');
    setParsedData(null);
    if (recognition) {
      try {
        recognition.start();
        setIsListening(true);
      } catch (err) {
        setIsListening(true);
      }
    } else {
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognition) {
      try { recognition.stop(); } catch (e) {}
    }
    setIsListening(false);
  };

  const handleSimulatedVoice = (demoText) => {
    setTranscript(demoText);
    parseVoiceInput(demoText);
    setIsListening(false);
    const audioMsg = language === 'ta' 
      ? `பதிவு பெறப்பட்டது: ${demoText}`
      : `Voice parsed: ${demoText}`;
    speakText(audioMsg);
  };

  const handleConfirm = () => {
    if (parsedData && onParsedResult) {
      onParsedResult(parsedData);
      speakText(language === 'ta' ? "பொருள் விவரங்கள் சேர்க்கப்பட்டன" : "Product details applied!");
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-emerald-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 to-teal-800 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Mic className="w-6 h-6 text-emerald-200 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-tamil">{t('voiceAssistance')}</h3>
              <p className="text-xs text-emerald-100/90 font-medium">
                {language === 'ta' ? 'குரல் மூலமாக சுலபமாக தகவல் உள்ளிடலாம்' : 'Speak details without typing'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Main Mic Recording Area */}
          <div className="flex flex-col items-center justify-center py-6 bg-slate-50 rounded-2xl border border-dashed border-emerald-300">
            <button
              onClick={isListening ? stopListening : startListening}
              className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                isListening 
                  ? 'bg-rose-600 text-white animate-bounce ring-8 ring-rose-100' 
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30'
              }`}
            >
              {isListening ? <MicOff className="w-10 h-10" /> : <Mic className="w-10 h-10" />}
            </button>

            <p className="mt-4 text-sm font-semibold text-slate-700 text-center font-tamil px-4">
              {isListening 
                ? (language === 'ta' ? 'கேட்கிறது... பேசுங்கள்...' : 'Listening... Speak now...') 
                : (language === 'ta' ? 'மைக்கை அழுத்தவும்' : 'Tap Microphone to Speak')}
            </p>

            <p className="text-xs text-slate-500 mt-1 text-center font-tamil px-6">
              {t('listening')}
            </p>
          </div>

          {/* Transcript Output */}
          {transcript && (
            <div className="bg-emerald-50/80 rounded-xl p-4 border border-emerald-200">
              <div className="flex items-center justify-between text-xs text-emerald-800 font-bold uppercase tracking-wider mb-1">
                <span>{language === 'ta' ? 'பேசியது:' : 'Spoken Speech:'}</span>
                <button 
                  onClick={() => speakText(transcript)}
                  className="flex items-center gap-1 text-emerald-700 hover:text-emerald-900"
                >
                  <Volume2 className="w-4 h-4" /> {language === 'ta' ? 'கேட்க' : 'Listen'}
                </button>
              </div>
              <p className="text-slate-800 text-base italic">"{transcript}"</p>
            </div>
          )}

          {/* Extracted Form Fields Preview */}
          {parsedData && (
            <div className="bg-white rounded-xl p-4 border border-emerald-300 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>{language === 'ta' ? 'தானாக கண்டறியப்பட்ட தகவல்கள்:' : 'Auto-Detected Data:'}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-100">
                  <span className="text-xs text-slate-500 block font-tamil">{t('productName')}</span>
                  <span className="text-sm font-bold text-emerald-900">{parsedData.name}</span>
                </div>
                <div className="bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-100">
                  <span className="text-xs text-slate-500 block font-tamil">{t('pricePerKg')}</span>
                  <span className="text-sm font-bold text-emerald-900">₹{parsedData.price}/kg</span>
                </div>
                <div className="bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-100">
                  <span className="text-xs text-slate-500 block font-tamil">{t('availableQty')}</span>
                  <span className="text-sm font-bold text-emerald-900">{parsedData.availableQty} kg</span>
                </div>
              </div>
            </div>
          )}

          {/* Demo Spoken Voice Shortcuts (for quick test click) */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-500 block uppercase font-tamil">
              {language === 'ta' ? 'மாதிரி குரல் சொற்களை சொடுக்கலாம்:' : 'Or tap a sample spoken sentence:'}
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleSimulatedVoice(language === 'ta' ? "தக்காளி நாற்பது ரூபாய் நூறு கிலோ" : "Tomato forty rupees per kg one hundred kg")}
                className="text-xs bg-slate-100 hover:bg-emerald-100 hover:text-emerald-900 px-3 py-1.5 rounded-lg text-slate-700 transition font-tamil"
              >
                {language === 'ta' ? '🍅 தக்காளி 40 ரூபாய் 100 கிலோ' : '🍅 Tomato 40 RS 100 KG'}
              </button>
              <button
                type="button"
                onClick={() => handleSimulatedVoice(language === 'ta' ? "வெங்காயம் முப்பது ரூபாய் இருநூறு கிலோ" : "Onion thirty rupees two hundred kg")}
                className="text-xs bg-slate-100 hover:bg-emerald-100 hover:text-emerald-900 px-3 py-1.5 rounded-lg text-slate-700 transition font-tamil"
              >
                {language === 'ta' ? '🧅 வெங்காயம் 30 ரூபாய் 200 கிலோ' : '🧅 Onion 30 RS 200 KG'}
              </button>
              <button
                type="button"
                onClick={() => handleSimulatedVoice(language === 'ta' ? "அரிசி அறுபது ரூபாய் ஐந்நூறு கிலோ" : "Rice sixty rupees five hundred kg")}
                className="text-xs bg-slate-100 hover:bg-emerald-100 hover:text-emerald-900 px-3 py-1.5 rounded-lg text-slate-700 transition font-tamil"
              >
                {language === 'ta' ? '🌾 அரிசி 60 ரூபாய் 500 கிலோ' : '🌾 Rice 60 RS 500 KG'}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 rounded-xl transition"
          >
            {t('cancel')}
          </button>
          <button
            onClick={handleConfirm}
            disabled={!parsedData}
            className="px-6 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition"
          >
            <Check className="w-4 h-4" /> {language === 'ta' ? 'விவரங்களை பயன்படுத்தவும்' : 'Apply Details'}
          </button>
        </div>
      </div>
    </div>
  );
};
