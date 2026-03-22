import Aegung_Banner from "./Aegung_Banner";
import Aegung_Product_Card from "./Aegung_Product_Card";
import "./Aegung_Product.scss";

const productData = [
    {
        id: 1,
        titleKo: "경복궁",
        titleEnSub: "Gyeongbokgung Palace",
        titleEnMain: "HandWash, HandCream",
        image: "/images/aegung/03-Product/Product01-경복궁.png",
        imageAlt: "경복궁 HandWash, HandCream",
        desc: "한국의 고궁, 경복궁의 정온한 공기와 고즈넉한 나무의 결을 향으로 재해석한 특별한 세트입니다. 시간이 멈춘 듯한 고궁의 단청 아래서 느껴지는 묵직한 우디 향과 대지의 기운을 담은 베티버가 조화를 이루어, 일상 속 손을 씻고 보듬는 행위를 하나의 명상적인 의식으로 바꿔줍니다.",
        notes: [
            { name: "시더우드", desc: "고궁의 기둥과 서까래에서 느껴지는 깊고 단단한 나무의 향."  },
            { name: "베티버", desc: "비 갠 뒤의 흙내음처럼 차분하게 가라앉는 대지의 기운." },
            { name: "세이지", desc: "지친 감각을 부드럽게 깨우는 허브의 정화 기능." },
        ],
        price: "76,000",
        reversed: false,
    },
    {
        id: 2,
        titleKo: "창덕궁",
        titleEnSub: "Changdeokgung Palace",
        titleEnMain: "BodyCleanser, BodyScrub, BodyBalm",
        image: "/images/aegung/03-Product/Product02-창경궁.png",
        imageAlt: "창덕궁 BodyCleanser, BodyScrub, BodyBalm",
        desc: "자연과 궁궐이 가장 완벽하게 어우러진 곳, 창덕궁의 고귀한 정취를 향으로 재해석한 특별한 바디 케어 세트입니다. 비대칭의 미학 속에 숨겨진 비밀스러운 후원을 거닐듯, 일상의 샤워 시간을 깊은 사유와 회복의 의식으로 채워줍니다.",
        notes: [
            { name: "무화과 잎", desc: "짙은 녹음이 우거진 창덕궁의 생명력을 닮은 싱그럽고 달콤한 첫인상." },
            { name: "그린 플로럴", desc: "전각 사이사이 피어난 야생화와 풀꽃들이 바람에 실어 보내는 은은하고 우아한 결." },
            { name: "젖은 흙", desc: "단비가 내린 뒤 고즈넉한 고궁의 산책로에서 느껴지는 묵직하고 차분한 대지의 숨결." },
        ],
        price: "85,000",
        reversed: true,
    },
    {
        id: 3,
        titleKo: "덕수궁",
        titleEnSub: "Gyeongbokgung Palace",
        titleEnMain: "Perfume Set",
        image: "/images/aegung/03-Product/Product03-덕수궁.png",
        imageAlt: "덕수궁 Perfume Set",
        desc: "샌달우드 바디 워시로 마음을 정돈한 뒤, 아이리스 바디 로션을 레이어링해 보세요. 창덕궁의 숲길을 걷다 우연히 마주친 꽃 향기처럼, 입체적이고 신비로운 당신만의 향기 궤적을 만들 수 있습니다.",
        notes: [
            { name: "아이리스", desc: "봄날 덕수궁 화단에 피어난 보랏빛 꽃잎처럼 우아하고 포근한 파우더리 향" },
            { name: "샌달우드", desc: "오래된 전각의 기둥에서 느껴지는 깊고 묵직한 나무의 온기" },
            { name: "앰버", desc: "석조전에 내려앉은 노을처럼 따뜻하고 신비로운 진향" },
        ],
        price: "120,000",
        reversed: false,
    },
];

const Aegung_Product = () => {
    return (
        <section className="product">
            <Aegung_Banner />
            <div className="inner">
                {productData.map((product) => (
                    <Aegung_Product_Card
                        key={product.id}
                        id={product.id}
                        titleKo={product.titleKo}
                        titleEnSub={product.titleEnSub}
                        titleEnMain={product.titleEnMain}
                        image={product.image}
                        imageAlt={product.imageAlt}
                        desc={product.desc}
                        notes={product.notes}
                        price={product.price}
                        reversed={product.reversed}
                    />
                ))}
            </div>
        </section>
    );
};

export default Aegung_Product;