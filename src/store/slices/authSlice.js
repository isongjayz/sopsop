// ========================================
// authSlice - 인증 관련 상태 관리
// 로그인, 회원가입, 로그아웃, 테스트 계정, 계정 찾기
// ========================================

export const createAuthSlice = (set, get) => ({
    users: [],
    user: null,
    isLoggedIn: false,
    authError: null,

    login: ({ email, password }) => {
        const { users } = get();
        const found = users.find(u => u.email === email && u.password === password);
        if (found) {
            const { password: _, ...safeUser } = found;
            set({ user: safeUser, isLoggedIn: true, authError: null });
            return true;
        }
        set({ authError: '이메일 또는 비밀번호가 일치하지 않습니다.' });
        return false;
    },

    loginAsTestUser: (onlyRegister = false) => {
        const { users } = get();
        // 수정: 테스트 계정에 마이페이지 기본 프로필 데이터 포함
        const testUser = {
            id: 'test-user-001',
            name: '테스트 사용자',
            email: 'test@aesop.com',
            phone: '010.1234.5678',
            password: 'test1234',
            birth: '1987.03.16',
            gender: '여성',
            zipcode: '06021',
            country: '대한민국',
            address: '서울특별시 강남구 도산대로45길 10-6',
            createdAt: new Date().toISOString(),
        };

        const exists = users.find(u => u.email === testUser.email);
        if (!exists) {
            set({ users: [...users, testUser] });
        }

        if (!onlyRegister) {
            const { password: _, ...safeUser } = testUser;
            set({ user: safeUser, isLoggedIn: true, authError: null });
        }

        return testUser;
    },

    signup: (userData) => {
        const { users } = get();
        if (users.find(u => u.email === userData.email)) {
            set({ authError: '이미 사용 중인 이메일입니다.' });
            return false;
        }
        const newUser = {
            ...userData,
            id: `user-${Date.now()}`,
            createdAt: new Date().toISOString(),
        };
        set({ users: [...users, newUser], authError: null });
        return true;
    },

    logout: () => {
        get().clearCart();
        set({ user: null, isLoggedIn: false, authError: null });
    },


    updateUser: (userId, updates) => {
        const { users, user } = get();
        const updated = users.map(u =>
            u.id === userId ? { ...u, ...updates } : u
        );
        const { password: _, ...safeUpdates } = updates;
        set({
            users: updated,
            user: user?.id === userId ? { ...user, ...safeUpdates } : user,
        });
    },

    findEmail: (name, phone) => {
        const { users } = get();
        const found = users.find(u => u.name === name && u.phone === phone);
        return found ? found.email : null;
    },

    findPassword: (email, name) => {
        const { users } = get();
        const found = users.find(u => u.email === email && u.name === name);
        return !!found;
    },

    // 수정: 이메일 + 휴대폰 번호 일치 시에만 비밀번호 재설정 허용
    resetPassword: (email, phone, newPassword) => {
        const { users } = get();
        const target = users.find(u => u.email === email && u.phone === phone);
        if (!target) {
            return false;
        }
        const updated = users.map(u =>
            u.email === email && u.phone === phone ? { ...u, password: newPassword } : u
        );
        set({ users: updated });
        return true;
    },

    updatePassword: (userId, currentPassword, newPassword) => {
        const { users } = get();
        const userObj = users.find(u => u.id === userId);

        if (!userObj || userObj.password !== currentPassword) {
            return { success: false, message: '현재 비밀번호가 일치하지 않습니다.' };
        }

        const updated = users.map(u =>
            u.id === userId ? { ...u, password: newPassword } : u
        );
        set({ users: updated });
        return { success: true };
    },

    clearAuthError: () => set({ authError: null }),
});
