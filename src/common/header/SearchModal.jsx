// ========================================
// SearchModal - 전체화면 검색 모달
// blur 오버레이, 최근 검색어 localStorage 관리
// ========================================

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import useStore from '../../store/useStore';
import './SearchModal.scss';

const RECENT_SEARCHES_KEY = 'recentSearches';
const MAX_RECENT = 5;

const SearchModal = ({ onClose }) => {
    const [query, setQuery] = useState('');
    const [recentSearches, setRecentSearches] = useState([]);
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const { setFilters } = useStore();

    // 최근 검색어 로드
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY) || '[]');
        setRecentSearches(saved);
        inputRef.current?.focus();
    }, []);

    // 최근 검색어 저장
    const saveRecentSearch = (searchQuery) => {
        const searches = JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY) || '[]');
        const updated = [searchQuery, ...searches.filter(v => v !== searchQuery)].slice(0, MAX_RECENT);
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
        setRecentSearches(updated);
    };

    // 최근 검색어 개별 삭제
    const removeRecentSearch = (searchQuery) => {
        const searches = JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY) || '[]');
        const updated = searches.filter(v => v !== searchQuery);
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
        setRecentSearches(updated);
    };

    // 검색 실행
    const handleSearch = (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        saveRecentSearch(query.trim());
        setFilters({ name: query.trim() });
        navigate('/product');
        onClose();
    };

    // 최근 검색어 클릭
    const handleRecentClick = (searchQuery) => {
        setFilters({ name: searchQuery });
        navigate('/product');
        onClose();
    };

    // ESC 키로 닫기
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <div className="search-modal" onClick={onClose}>
            <div className="search-modal__content" onClick={(e) => e.stopPropagation()}>
                {/* 닫기 버튼 */}
                <button className="search-modal__close" onClick={onClose} aria-label="닫기">
                    <X size={28} />
                </button>

                {/* 검색 입력 */}
                <form className="search-modal__form" onSubmit={handleSearch}>
                    <input
                        ref={inputRef}
                        type="text"
                        className="search-modal__input"
                        placeholder="검색어를 입력하세요"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </form>

                {/* 최근 검색어 */}
                {recentSearches.length > 0 && (
                    <div className="search-modal__recent">
                        <p className="search-modal__recent-title">최근 검색어</p>
                        <div className="search-modal__recent-list">
                            {recentSearches.map((search, idx) => (
                                <div key={idx} className="search-modal__pill">
                                    <button
                                        className="search-modal__pill-text"
                                        onClick={() => handleRecentClick(search)}
                                    >
                                        {search}
                                    </button>
                                    <button
                                        className="search-modal__pill-remove"
                                        onClick={() => removeRecentSearch(search)}
                                        aria-label={`${search} 삭제`}
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchModal;
