// Gift - 기프트 큐레이션 메인 페이지
import { Link } from 'react-router-dom';
import './style.scss';

const curations = [
    {
        id: 'housewarming',
        title: '집들이 선물',
        desc: '새로운 시작을 축하하는 향기로운 선물',
        image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&q=80'
    },
    {
        id: 'birthday',
        title: '생일 선물',
        desc: '특별한 날을 더욱 빛나게 할 큐레이션',
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80'
    },
    {
        id: 'small-gift',
        title: '가벼운 선물',
        desc: '부담 없이 마음을 전하기 좋은 아이템',
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80'
    },
    {
        id: 'for-me',
        title: '나를 위한 선물',
        desc: '온전히 나에게 집중하는 휴식의 시간',
        image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&q=80'
    }
];

const Gift = () => {
    return (
        <div className="gift-curation-full">
            <div className="gift-curation-full__container">
                {curations.map(item => (
                    <Link to={`/gift/${item.id}`} key={item.id} className="gift-curation-full__column">
                        <div className="gift-curation-full__bg" style={{ backgroundImage: `url(${item.image})` }}></div>
                        <div className="gift-curation-full__overlay"></div>
                        <div className="gift-curation-full__content">
                            <h3 className="font-serif">{item.title}</h3>
                            <p>{item.desc}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Gift;
