// ========================================
// Footer - Aesop 하단 푸터
// ========================================
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer id="footer" className="footer">
            <div className="footer__inner">
                <div className="footer__top">
                    {/* 좌측 정보 */}
                    <div className="footer__info">
                        <ul className="footer__policy">
                            <li><Link to="#none">개정약관</Link></li>
                            <li><Link to="#none">채용정보</Link></li>
                            <li><Link to="#none">이용약관</Link></li>
                            <li><Link to="#none">개인정보처리방침</Link></li>
                            <li><Link to="#none">영상정보처리기기 운영관리방침</Link></li>
                            <li><Link to="#none">사이트맵</Link></li>
                            <li><Link to="#none">고객지원</Link></li>
                        </ul>
                        <div className="footer__details">
                            <p>엘오케이(유) | 대표자: REBELO PIZARRO RODRIGO ALVARO | 서울특별시 강남구 영동대로 517 아셈타워 31층 | 대표전화: 1800-1987</p>
                            <p>사업자 번호: 220-81-73483 | 통신판매업신고: 2012-서울강남-01663
                                <a href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=2208173483" target="_blank" rel="noreferrer">사업자정보확인하기</a>
                            </p>
                            <p className="footer__copy">&copy; Aesop</p>
                        </div>
                    </div>

                    {/* 우측 SNS */}
                    <ul className="footer__sns">
                        <li><a href="https://www.instagram.com/aesop/" target="_blank" rel="noreferrer">Instagram</a></li>
                        <li><a href="https://x.com/aesopskincare" target="_blank" rel="noreferrer">X</a></li>
                        <li><a href="https://pf.kakao.com/_BxdYjT?openQrModal=true" target="_blank" rel="noreferrer">Kakao</a></li>
                        <li><a href="https://www.linkedin.com/company/aesop" target="_blank" rel="noreferrer">Linkedin</a></li>
                    </ul>
                </div>
            </div>

            {/* 타이포그래피 로고 */}
            <div className="footer__typo-wrapper">
                <div className="footer__typo font-serif">Aēsop</div>
            </div>
        </footer>
    );
};

export default Footer;
