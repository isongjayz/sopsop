// ========================================
// Footer - Aesop 하단 푸터
// ========================================
import { Link } from 'react-router-dom';

const policyLinks = [
    { label: "개정약관", to: "#none" },
    { label: "채용정보", to: "#none" },
    { label: "이용약관", to: "#none" },
    { label: "개인정보처리방침", to: "#none" },
    { label: "영상정보처리기기 운영관리방침", to: "#none" },
    { label: "사이트맵", to: "#none" },
    { label: "고객지원", to: "/board" },
];

const snsLinks = [
    { label: "Instagram", href: "https://www.instagram.com/aesop/" },
    { label: "SpaceX", href: "https://x.com/aesopskincare" },
    { label: "Kakaotalk", href: "https://pf.kakao.com/_BxdYjT?openQrModal=true" },
    { label: "Linkedin", href: "https://www.linkedin.com/company/aesop" },
];

const Footer = () => {
    return (
        <footer id="footer" className="footer">
            <div className="footer_inner">
                {/* 상단 정보 영역 */}
                <div className="footer_top">
                    <div className="footer_left">
                        {/* 정책 링크 */}
                        <ul className="footer_policy">
                            {policyLinks.map((item) => (
                                <li key={item.label}>
                                    <Link to={item.to}>{item.label}</Link>
                                </li>
                            ))}
                        </ul>

                        {/* 회사 정보 */}
                        <div className="footer_info">
                            <p>
                                엘오케이(유) | 대표자: REBELO PIZARRO RODRIGO ALVARO &nbsp;
                                서울특별시 강남구 영동대로 517 아셈타워 31층 | 대표전화: 1800-1987
                            </p>
                            <p>
                                사업자 번호: 220-81-73483 | 통신판매업신고: 2012-서울강남-01663&nbsp;
                                <a href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=2208173483" target="_blank" rel="noreferrer">
                                    사업자정보확인하기
                                </a>
                            </p>
                            <p>&copy; Aesop</p>
                        </div>
                    </div>

                    {/* SNS 링크 */}
                    <ul className="footer_sns">
                        {snsLinks.map((item) => (
                            <li key={item.label}>
                                <a href={item.href} target="_blank" rel="noreferrer">{item.label}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 구분선 */}
                <div className="footer_line"></div>

                {/* 로고 */}
                <div className="footer_logo">
                    <img src="/images/common/FooterLogo.png" alt="Aesop" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
