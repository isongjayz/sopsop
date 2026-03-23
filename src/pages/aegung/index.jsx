// AE-GUNG - K 콘텐츠 관련 큐레이션 페이지 (준비 중)
import { Link } from 'react-router-dom';
import './style.scss';
import Aegung_MainVisual from '../../components/aegung/Aegung_MainVisual';
import Aegung_About from '../../components/aegung/Aegung_About';
import Aegung_Product from '../../components/aegung/Aegung_Product';
import Aegung_Packaging from '../../components/aegung/Aegung_Packaging';
import Aegung_SpecialStores from '../../components/aegung/Aegung_SpecialStores';

const AeGung = () => {
    return (
        <main className="aegung">
            <Aegung_MainVisual />
            <Aegung_About />
            <Aegung_Product/>
            <Aegung_Packaging />
            <Aegung_SpecialStores />
        </main>
    );
};
export default AeGung;
