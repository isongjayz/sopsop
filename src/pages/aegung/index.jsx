// AE-GUNG - K 콘텐츠 관련 큐레이션 페이지 (준비 중)
import { Link } from 'react-router-dom';
import './style.scss';

const AeGung = () => {
    return (
        <div className="aegung inner">
            <h2 className="font-serif aegung__title">AE-GUNG</h2>
            <p className="aegung__desc">K 콘텐츠 큐레이션 페이지가 곧 공개됩니다.</p>
            <Link to="/product" className="aegung__btn">
                제품 둘러보기
            </Link>
        </div>
    );
};
export default AeGung;
