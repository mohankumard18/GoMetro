import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User, Key, ArrowRight, ShieldCheck } from 'lucide-react';
import { GoMetroAIAssistant, ChatMessage } from '../../engine/aiAssistant';
import { City, RoutePlan, ActiveJourney } from '../../types/metro';

interface GoMetroChatProps {
  isOpen: boolean;
  onClose: () => void;
  assistant: GoMetroAIAssistant;
  currentCity: City;
  onStartJourneyFromAi: (route: RoutePlan) => void;
  onOpenTicketsTab: () => void;
}

export const GoMetroChat: React.FC<GoMetroChatProps> = ({
  isOpen,
  onClose,
  assistant,
  currentCity,
  onStartJourneyFromAi,
  onOpenTicketsTab
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with greeting if empty
  useEffect(() => {
    if (messages.length === 0) {
      assistant.processUserMessage('hello').then(greeting => {
        setMessages([greeting]);
      });
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: 'user_' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setLoading(true);

    try {
      const response = await assistant.processUserMessage(query);
      setMessages(prev => [...prev, response]);
    } catch (e) {
      console.warn('AI error:', e);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    `How to reach Raidurg from Ameerpet?`,
    `Where do I change lines on my route?`,
    `Does Ameerpet station have an elevator?`,
    `What are the metro operating timings?`,
    `I missed my stop, what should I do?`
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Click outside to close */}
      <div className="fixed inset-0 -z-10" onClick={onClose}></div>

      {/* Slide-over Drawer */}
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white backdrop-blur-md">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="font-extrabold text-base flex items-center gap-1.5">
                <span>GoMetro AI Assistant</span>
              </h2>
              <p className="text-[11px] text-blue-100 font-medium">
                Grounded transit intelligence for {currentCity.city_name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
              title="AI Settings & API Key"
            >
              <Key className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Collapsible API Key Settings */}
        {showSettings && (
          <div className="p-4 bg-slate-100 border-b border-slate-200 text-xs space-y-2 animate-in slide-in-from-top duration-150">
            <div className="font-bold text-slate-800 flex items-center justify-between">
              <span>Optional Gemini API Key</span>
              <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-semibold">
                Default: Grounded Transit Engine Active
              </span>
            </div>
            <p className="text-slate-600 text-[11px]">
              GoMetro works out-of-the-box with deterministic transit routing. You can optionally paste a Gemini API Key for open conversational features.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <input
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
              />
              <button
                onClick={() => {
                  assistant.setApiKey(apiKeyInput);
                  setShowSettings(false);
                }}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs"
              >
                Save
              </button>
            </div>
          </div>
        )}

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none'
              }`}>
                {/* Parse Markdown-like bold and linebreaks */}
                <div className="whitespace-pre-line space-y-1">
                  {msg.text.split('\n').map((line, i) => {
                    const parsed = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                    return <div key={i} dangerouslySetInnerHTML={{ __html: parsed }} />;
                  })}
                </div>

                {/* Suggested Action Callouts */}
                {msg.suggestedAction && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100">
                    {msg.suggestedAction.type === 'start_journey' && msg.structuredRoute ? (
                      <button
                        onClick={() => {
                          onStartJourneyFromAi(msg.structuredRoute!);
                          onClose();
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-blue-700 to-sky-600 hover:from-blue-800 hover:to-sky-700 text-white font-extrabold text-xs shadow-sm flex items-center justify-center gap-1.5 transition"
                      >
                        <span>Start Journey Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : msg.suggestedAction.type === 'open_tickets' ? (
                      <button
                        onClick={() => {
                          onOpenTicketsTab();
                          onClose();
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition"
                      >
                        <span>Open Official Tickets</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : null}
                  </div>
                )}

                <div className={`text-[9px] mt-1 text-right ${
                  msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                }`}>
                  {msg.timestamp}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-500 italic p-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin" />
              <span>GoMetro AI is consulting transit graph...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Question Chips */}
        <div className="p-2.5 border-t border-slate-200 bg-white overflow-x-auto no-scrollbar flex items-center gap-1.5">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-[11px] font-semibold whitespace-nowrap transition border border-slate-200"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything about routes, stations..."
              className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || loading}
              className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white transition shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
