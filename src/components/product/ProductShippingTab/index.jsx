const shippingContentByCategory = {
    hand: {
        sections: [
            {
                serviceTitle: 'Service',
                serviceCopy:
                    '세심한 검수와 최소한의 패키징.\n당신의 일상에 스며드는 기다림의 시간까지 배려하는 마음을 담았습니다.',
                title: 'Delivery',
                description:
                    '전국 무료배송(일요일, 공휴일 휴무, 군부대 지역 배송 불가)\n오전 9시 전 주문 시 당일 출고\n배송 기간 : 영업일 기준 2~3일 소요',
                image: '/images/product/handbalm02.png',
            },
            {
                serviceTitle: 'Service',
                serviceCopy:
                    '가장 편안한 마음으로 제품을 경험하실 수 있도록,\n유연하고 투명한 서비스 정책을 유지합니다',
                title: 'Exchange & Return',
                description:
                    '제품 수령 후 30일 이내 반품 가능\n무료 반품 (단, 미개봉 제품에 한함)\n개봉 방지 스티커 훼손, 제품 사용, 구성품 분실 시 반품 불가',
                image: '/images/product/handbalm01.png',
            },
            {
                serviceTitle: 'Service',
                serviceCopy:
                    '온라인에서 구매하신 미개봉 제품은 전국 오프라인 매장에서 교환이 가능합니다.\n동일 금액의 제품 또는 차액 지불 후 더 높은 가격의 제품으로 교환하실 수 있습니다.',
                title: 'Signature',
                description:
                    '오프라인 매장 교환 서비스\n제품의 질감을 직접 경험하며 나에게 가장 알맞은 제품을 선택해 보세요!',
                image: '/images/product/handbalm03.png',
            },
        ],
    },
    fragrance: {
        sections: [
            {
                serviceTitle: 'Service',
                serviceCopy:
                    '신속한 접수와 최소한의 패키징.\n당신의 일상에 스며드는 기다림의 시간을 덜어냅니다.',
                title: 'Delivery',
                description: '전국 무료배송으로 제공되며, 영업일 기준 1~3일 이내 도착합니다.',
                image: '/images/product/fresh02.jpg',
            },
            {
                serviceTitle: 'Service',
                serviceCopy:
                    '가장 편안한 마음으로 제품을 경험하실 수 있도록,\n유연하고 투명한 서비스를 제공합니다.',
                title: 'Exchange & Return',
                description:
                    '향수 제품은 개봉 시 교환 및 반품이 제한될 수 있으며, 미개봉 상태에서만 정상 접수됩니다.',
                image: '/images/product/fresh01.jpg',
            },
            {
                serviceTitle: 'Service',
                serviceCopy:
                    '온라인에서 구매하더라도 패키징 경험이 흐트러지지 않도록,\n브랜드의 인상을 그대로 전달합니다.',
                title: 'Signature',
                description:
                    '시그니처 톤의 포장과 정제된 패키지 구성으로 제품을 보다 단정하게 전달합니다.',
                image: '/images/product/fresh03.jpg',
            },
        ],
    },
    body: {
        sections: [
            {
                serviceTitle: 'Service',
                serviceCopy:
                    '신속한 접수와 최소한의 패키징.\n당신의 일상에 스며드는 기다림의 시간을 덜어냅니다.',
                title: 'Delivery',
                description: '전국 무료배송으로 제공되며, 영업일 기준 1~3일 이내 도착합니다.',
                image: '/images/product/body09.png',
            },
            {
                serviceTitle: 'Service',
                serviceCopy:
                    '가장 편안한 마음으로 제품을 경험하실 수 있도록,\n유연하고 투명한 서비스를 제공합니다.',
                title: 'Exchange & Return',
                description:
                    '제품 수령 후 30일 이내 교환 및 반품이 가능하며, 사용 흔적이 없는 상품에 한해 접수됩니다.',
                image: '/images/product/body08.png',
            },
            {
                serviceTitle: 'Service',
                serviceCopy:
                    '온라인에서 구매하더라도 패키징 경험이 흐트러지지 않도록,\n브랜드의 인상을 그대로 전달합니다.',
                title: 'Signature',
                description:
                    '절제된 패키지와 정돈된 포장 톤으로 선물용으로도 무리 없는 구성을 유지합니다.',
                image: '/images/product/body10.png',
            },
        ],
    },
    room: {
        sections: [
            {
                serviceTitle: 'Service',
                serviceCopy:
                    '신속한 접수와 최소한의 패키징.\n당신의 일상에 스며드는 기다림의 시간을 덜어냅니다.',
                title: 'Delivery',
                description: '전국 무료배송으로 제공되며, 영업일 기준 1~3일 이내 도착합니다.',
                image: '/images/product/woody02.jpg',
            },
            {
                serviceTitle: 'Service',
                serviceCopy:
                    '가장 편안한 마음으로 제품을 경험하실 수 있도록,\n유연하고 투명한 서비스를 제공합니다.',
                title: 'Exchange & Return',
                description:
                    '제품 수령 후 30일 이내 교환 및 반품이 가능하며, 상품 상태 확인 후 순차적으로 처리됩니다.',
                image: '/images/product/woody01.jpg',
            },
            {
                serviceTitle: 'Service',
                serviceCopy:
                    '온라인에서 구매하더라도 패키징 경험이 흐트러지지 않도록,\n브랜드의 인상을 그대로 전달합니다.',
                title: 'Signature',
                description:
                    '오프라인 경험을 닮은 차분한 패키징으로 공간 제품 특유의 분위기를 손상시키지 않도록 준비합니다.',
                image: '/images/product/woody03.jpg',
            },
        ],
    },
};

const defaultShippingContent = {
    sections: [
        {
            serviceTitle: 'Service',
            serviceCopy:
                '신속한 접수와 최소한의 패키징.\n당신의 일상에 스며드는 기다림의 시간을 덜어냅니다.',
            title: 'Delivery',
            description: '전국 무료배송으로 제공되며, 영업일 기준 1~3일 이내 도착합니다.',
            image: '/images/product/fresh02.jpg',
        },
        {
            serviceTitle: 'Service',
            serviceCopy:
                '가장 편안한 마음으로 제품을 경험하실 수 있도록,\n유연하고 투명한 서비스를 제공합니다.',
            title: 'Exchange & Return',
            description:
                '제품 수령 후 30일 이내 교환 및 반품이 가능하며, 상품 상태 확인 후 순차적으로 처리됩니다.',
            image: '/images/product/fresh01.jpg',
        },
        {
            serviceTitle: 'Service',
            serviceCopy:
                '온라인에서 구매하더라도 패키징 경험이 흐트러지지 않도록,\n브랜드의 인상을 그대로 전달합니다.',
            title: 'Signature',
            description: '단정한 패키징과 정제된 포장 경험으로 제품을 보다 안정감 있게 전달합니다.',
            image: '/images/product/fresh03.jpg',
        },
    ],
};

const SHIPPING_IMAGE_BY_TITLE = {
    Signature: '/images/product/detail/signature.jpg',
};

const DEFAULT_SHIPPING_IMAGE = '/images/product/detail/delivery.jpg';

function getShippingSections(product) {
    const shippingContent = shippingContentByCategory[product.category] || defaultShippingContent;

    return shippingContent.sections.map((section) => ({
        ...section,
        image: SHIPPING_IMAGE_BY_TITLE[section.title] || DEFAULT_SHIPPING_IMAGE,
    }));
}

function ProductShippingTab({ product }) {
    const shippingSections = getShippingSections(product);

    return (
        <div className="product-shipping-tab">
            {shippingSections.map((section) => (
                <section className="product-shipping-tab__section" key={section.title}>
                    <div className="product-shipping-tab__section-copy">
                        <h3 className="product-shipping-tab__eyebrow">{section.serviceTitle}</h3>
                        <p className="product-shipping-tab__copy">{section.serviceCopy}</p>
                    </div>

                    <div className="product-shipping-tab__content">
                        <div className="product-shipping-tab__image">
                            <img src={section.image} alt={section.title} />
                        </div>
                        <div className="product-shipping-tab__body">
                            <h4>{section.title}</h4>
                            <p>{section.description}</p>
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
}

export default ProductShippingTab;
