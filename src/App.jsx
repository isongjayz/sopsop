// ========================================
// App - Aesop 메인 앱 컴포넌트
// 앱 시작 시 fetchProducts() 1회 실행
// ========================================

import { useEffect } from 'react';
import MyRoutes from './routes/MyRoutes';
import useStore from './store/useStore';
import './styles/index.scss';

function App() {
    const fetchProducts = useStore((state) => state.fetchProducts);

    // 앱 시작 시 Seed Data 로드
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return <MyRoutes />;
}

export default App;
