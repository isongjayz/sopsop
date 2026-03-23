import { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";
import "./ChatBot.scss";

const BOT_NAME = "이솝 컨설턴트";

const AUTO_REPLY = [
  { keywords: ["주문", "결제", "취소"], reply: "주문 관련 문의는 마이페이지 > 주문 내역에서 확인하실 수 있습니다. 추가 문의는 1:1 문의를 이용해 주세요." },
  { keywords: ["배송", "배달", "언제"], reply: "일반 배송은 결제 완료 후 2~3 영업일 이내 출고됩니다. 배송 조회는 마이페이지 > 주문 내역에서 가능합니다." },
  { keywords: ["교환", "환불", "반품"], reply: "교환 및 환불은 상품 수령 후 7일 이내 신청 가능합니다. 마이페이지 > 1:1 문의로 접수해 주세요." },
  { keywords: ["제품", "성분", "피부"], reply: "이솝의 제품 성분 및 피부 타입별 추천은 저희 컨설턴트가 도움을 드릴 수 있습니다. 구체적인 피부 고민을 말씀해 주세요." },
  { keywords: ["매장", "위치", "오프라인"], reply: "가까운 이솝 매장은 홈페이지 매장 찾기 메뉴에서 확인하실 수 있습니다." },
  { keywords: ["향수", "향", "프래그런스"], reply: "이솝의 향수 라인은 각기 다른 개성을 가지고 있습니다. 아로마 가이드 상담을 통해 당신에게 어울리는 향을 찾아드릴게요." },
];

const DEFAULT_REPLY = "안녕하세요, 이솝 고객 지원입니다. 궁금하신 점을 말씀해 주세요. (예: 주문, 배송, 제품, 교환/환불)";

function getReply(text) {
  const matched = AUTO_REPLY.find(({ keywords }) =>
    keywords.some((kw) => text.includes(kw))
  );
  return matched ? matched.reply : "죄송합니다, 정확히 이해하지 못했습니다. 더 자세한 문의는 마이페이지 > 1:1 문의를 이용해 주세요.";
}

function ChatBot({ onClose }) {
  const [messages, setMessages] = useState([
    { id: 1, from: "bot", text: DEFAULT_REPLY },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    const userMsg = { id: Date.now(), from: "user", text };
    const botMsg = { id: Date.now() + 1, from: "bot", text: getReply(text) };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatbot">
      <div className="chatbot__header">
        <span className="chatbot__header__name">{BOT_NAME}</span>
        <button className="chatbot__header__close" onClick={onClose} aria-label="닫기">
          <X size={18} />
        </button>
      </div>

      <div className="chatbot__messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`chatbot__bubble chatbot__bubble--${msg.from}`}>
            {msg.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="chatbot__input-area">
        <input
          className="chatbot__input"
          type="text"
          placeholder="메시지를 입력하세요..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="chatbot__send" onClick={sendMessage} aria-label="전송">
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}

export default ChatBot;
