// ========================================
// boardSlice - 고객지원 상태 관리
// 공지사항, FAQ, 문의, Q&A CRUD
// ========================================

import { faqData, noticeData } from '../../assets/api/boardData';

export const createBoardSlice = (set, get) => ({
    // 상태
    notices: [],
    faqs: [],
    inquiries: [],
    qnas: [],

    // 공지사항 로드
    fetchNotices: () => {
        set({ notices: noticeData || [] });
    },

    // FAQ 로드 (카테고리 필터 옵션)
    fetchFAQs: (category) => {
        let data = faqData || [];
        if (category) {
            data = data.filter(f => f.category === category);
        }
        set({ faqs: data });
    },

    // === 1:1 문의 CRUD ===
    submitInquiry: (data) => {
        const { inquiries } = get();
        const newInquiry = {
            ...data,
            id: Date.now(),
            date: new Date().toISOString(),
            status: '답변 대기',
        };
        set({ inquiries: [newInquiry, ...inquiries] });
        return newInquiry;
    },

    updateInquiry: (id, updateData) => {
        const { inquiries } = get();
        set({
            inquiries: inquiries.map(inq =>
                inq.id === id ? { ...inq, ...updateData } : inq
            ),
        });
    },

    deleteInquiry: (id) => {
        const { inquiries } = get();
        set({ inquiries: inquiries.filter(inq => inq.id !== id) });
    },

    getUserInquiries: (userId) => {
        return get().inquiries.filter(inq => inq.userId === userId);
    },

    // === Q&A CRUD ===
    submitQna: (data) => {
        const { qnas } = get();
        const newQna = {
            ...data,
            id: Date.now(),
            date: new Date().toISOString(),
            status: '답변 대기',
        };
        set({ qnas: [newQna, ...qnas] });
        return newQna;
    },

    updateQna: (id, updateData) => {
        const { qnas } = get();
        set({
            qnas: qnas.map(q =>
                q.id === id ? { ...q, ...updateData } : q
            ),
        });
    },

    deleteQna: (id) => {
        const { qnas } = get();
        set({ qnas: qnas.filter(q => q.id !== id) });
    },

    getUserQnas: (userId) => {
        return get().qnas.filter(q => q.userId === userId);
    },
});
