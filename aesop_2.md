
# AESOP 구현 기준서

## 1. 이 문서의 목표

이 프로젝트의 핵심은 아래 4가지를 동시에 구현하는 것이다.

1. **Aesop 브랜드의 절제된 미니멀 디자인과 브랜드 무드를 웹 인터페이스로 구현**
2. **React + Zustand + LocalStorage 기반의 클라이언트 중심 이커머스 구조**
3. **상품 목록 → 상품 상세 → 장바구니 → 결제 → 마이페이지까지 이어지는 실제 쇼핑 흐름**
4. **GSAP 애니메이션을 활용한 브랜드 스토리 기반 인터랙티브 홈 화면 구현**

즉 이 프로젝트는 단순한 UI 모방이 아니라
**Aesop 브랜드 경험을 웹 인터페이스로 재현한 프론트엔드 이커머스 포트폴리오**를 목표로 한다.

홈 → 상품 탐색 → 상품 상세 → 장바구니 → 결제 → 주문 완료 → 마이페이지 관리

## 2. 한 줄 정의

**Aesop 브랜드의 미니멀한 디자인 철학과 스토리텔링을 기반으로 구현한 React 기반 서버리스 이커머스 포트폴리오**

- 백엔드는 사용하지 않는다.
- 상품, 회원, 장바구니, 주문, 리뷰, 문의 데이터는 **클라이언트 상태 + LocalStorage 영속성**으로 관리한다.
- 실제 쇼핑 흐름이 가능한 인터랙티브 UI를 구현한다.
- GSAP 애니메이션을 활용한 브랜드 경험 중심 인터페이스를 구현한다.

## 3. 이 프로젝트에서 절대 놓치면 안 되는 기준

### 3-1. 구조 기준

- 라우팅은 `react-router-dom` 기반으로 구성한다.
- 전역 상태 관리는 `Zustand`를 사용한다.
- LocalStorage persist key는 **`aesop-storage`** 를 사용한다.
- 데이터 소스는 API 호출이 아니라 **초기 Seed Data**를 사용한다.

### 3-2. 브랜드 경험 기준

- 여백 중심의 미니멀 레이아웃
- 브랜드 스토리를 전달하는 스크롤 기반 콘텐츠
- GSAP 기반 라인 드로잉 인터랙션
- 제품 이미지를 중심으로 한 에디토리얼 레이아웃

### 3-3. 사용자 경험 기준

사용자는 다음 흐름을 자연스럽게 경험할 수 있어야 한다.

홈 → 상품 탐색 → 상품 상세 → 장바구니 → 결제 → 주문 완료 → 마이페이지

## 4. 코드 기준 정정

### 4-1. 상태 관리

전역 상태는 `Zustand`를 사용한다.

관리 대상

- user
- cartItems
- wishlist
- orders
- reviews
- inquiries

### 4-2. 데이터 관리

상품 데이터는 API 호출이 아니라 **Seed Data**로 관리한다.

예

- productData
- productDetailData
- faqData

### 4-3. 영속성

LocalStorage persist key

aesop-storage

### 4-4. 컴포넌트 구조

컴포넌트는 다음 기준으로 분리한다.

- Page 컴포넌트
- Domain 컴포넌트 (product / cart / review)
- UI 컴포넌트 (button / modal / tabs)


## 5. 실제 기술 스택

### 5-1. 필수 스택

-   **React 19**
-   **Vite 7**
-   **React Router DOM 7**
-   **Zustand 5**
-   **Sass / SCSS**
-   **Swiper 11**
-   **GSAP 3**
-   **Lucide React**
-   **SweetAlert2**
-   **react-quill-new**
-   **react-daum-postcode**


---


## 6. 전역 디자인 시스템

### 6-1. 폰트

이 프로젝트의 기본 UI 폰트는 Pretendard이며, 영문 타이포그래피는 무드에
따라 Ogg / Bona Nova / Libre Baskerville를 보조적으로 사용한다.

-   한글 기본 폰트: Pretendard
-   영문 기본 폰트: Pretendard
-   영문 포인트 폰트: Ogg, Bona Nova, Libre Baskerville

UI 텍스트, 버튼, 상품 정보 등 실사용 텍스트는 Pretendard를 기본으로
유지한다.

Ogg / Bona Nova / Libre Baskerville는 히어로 타이틀, 에디토리얼 스타일
텍스트, 브랜드 무드용 타이포에 제한적으로 사용한다.

UI 기본 폰트 스택

``` scss
font-family:
    'Pretendard Variable',
    Pretendard,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    'Apple SD Gothic Neo',
    'Noto Sans KR',
    'Malgun Gothic',
    sans-serif;
```

``` scss
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');
```

영문 타이포그래피 (에디토리얼 / 브랜드 무드)

``` scss
font-family: 'Ogg', serif;
font-family: 'Bona Nova', serif;
font-family: 'Libre Baskerville', serif;
```

브랜드 무드를 위해 영문 세리프(Ogg / Bona Nova / Libre Baskerville)와
UI용 산세리프(Pretendard)를 혼합해 사용한다.

### 6-2. 컬러 토큰

이 프로젝트는 브라운 계열 컬러를 중심으로 한 컬러 팔레트를 사용한다.
컬러는 디자인 시스템의 일관성을 위해 토큰(Token) 형태로 관리한다.

현재 사용되는 컬러 토큰은 다음과 같다.

``` scss
$color-brown-100: #CEC2BE;
$color-brown-200: #B6A59E;
$color-brown-300: #947C72;
$color-brown-400: #806257;
$color-brown-500: #603B2D;
$color-brown-600: #573629;
$color-brown-700: #442A20;
$color-brown-900: #281913;

$color-yellow-500: #FDFBF2;
```

주요 사용 용도

-   \$color-yellow-500 : 전체 페이지의 기본 배경 색상
-   \$color-brown-500 : 버튼 hover / active 상태
-   \$color-brown-600 : 푸터 배경 색상
-   brown 계열 나머지 색상 : 텍스트 및 UI 요소 색상

컬러 토큰 확장

컬러 토큰은 디자인 시스템 확장에 따라 추가될 수 있으며, 필요에 따라 UI
상태 색상 또는 새로운 팔레트가 추가될 수 있다. 컬러는 직접 HEX 값을
사용하지 않고 컬러 토큰을 통해 사용한다.

### 6-3. 레이아웃 기준

-   공통 컨테이너 `.inner`
    -   `width: 95%`
    -   `max-width: 1600px`
    -   데스크탑 이하는 padding 추가
-   Header 높이
    -   Desktop: **80px**
    -   Tablet: **70px**
    -   Mobile: **60px**
-   Product Grid
    -   Desktop: **4열**
    -   Tablet: **3열**
    -   Mobile: **2열**
-   Product Card 이미지 비율
    -   `padding-top: 130%` 수준의 **세로로 긴 비율**

### 6-4. 반응형 브레이크포인트

``` scss
$mobile: 600px;
$tablet: 1023px;
$desktop: 1600px;
```

-   모바일: `max-width: 600px`
-   태블릿: `max-width: 1023px`
-   데스크탑 유틸: `max-width: 1600px`

### 6-5. 무드 키워드

-   minimal
-   monochrome
-   editorial
-   clean whitespace
-   uppercase headings
-   thin borders
-   restrained luxury


---


## 7. 전체 라우팅 맵

라우트는 아래 기준으로 구현한다. 동적 라우트는 `:param` 형태로 표기한다.
라우트는 SPA 기준으로 설계한다.

``` txt
/
/ae-gung
/gift

/product
/product/best
/product/hand
/product/body
/product/fragrance
/product/room
/product/:id

/checkout

/login
/signup
/find-account

/mypage
/mypage/orders
/mypage/wishlist
/mypage/inquiry

/board
```

### 7-1. 라우트 의미

-   `/` : 홈
-   `/ae-gung` : K 콘텐츠 관련 큐레이션 페이지
-   `/gift` : 기프트 큐레이션 페이지
-   `/product` : 전체 상품 목록
-   `/product/best` : 베스트 상품 페이지
-   `/product/hand` : 핸드 제품 페이지
-   `/product/body` : 바디 제품 페이지
-   `/product/fragrance` : 향수 제품 페이지
-   `/product/room` : 룸 제품 페이지
-   `/product/:id` : 상품 상세 페이지
-   `/checkout` : 장바구니, 결제정보 입력, 주문완료를 포함하는 통합 결제
    흐름 페이지
-   `/login, /signup, /find-account` : 인증 관련 페이지
-   `/mypage` : 회원 전용 개인 포털
-   `/mypage/orders` : 주문 내역 조회
-   `/mypage/wishlist` : 위시리스트 관리
-   `/mypage/inquiry` : 사용자가 작성한 문의 내역 조회 및 관리 페이지
-   `/board` : 고객지원 센터 허브 페이지

### 7-2. 결제 흐름

`/checkout` 페이지는 하나의 페이지 내부에서 step 형태로 동작한다.

-   Step 1 : 장바구니 (`cart`)
-   Step 2 : 결제 정보 입력 (`payment`)
-   Step 3 : 주문 완료 (`complete`)

각 step은 버튼 액션에 따라 전환되며, step 전환 시 별도 라우트 이동은
발생하지 않는다.

### 7-3. 고객지원 페이지 구성

`/board` 페이지는 고객지원 기능을 통합한 허브 페이지로 구성한다.

현재 기준으로 포함되는 내용은 다음과 같다.

-   컨설턴트와 상담하기 버튼을 통한 챗봇 연결
-   주요 지원 주제 안내
    -   배송 및 반품
    -   주문 관련
    -   제품 정보
    -   기업 문의
-   자주 묻는 질문 (FAQ)
    -   버튼 형태의 리스트로 구성되며, 클릭 시 답변이 펼쳐지고 다시
        접히는 방식으로 동작한다.
-   Contact 영역
    -   이메일 직접 문의
    -   전화번호 안내
    -   문의 가능 시간 안내
    -   라이브 채팅(챗봇)

고객 문의 작성 방식과 별도 라우트 생성 여부는 추후 확정한다.

### 7-4. 문의 관리 흐름

문의 내역 관리는 `/mypage/inquiry`에서 수행한다. 문의 상태에 따라 가능한
동작은 다음과 같다.

-   답변 대기 상태 : 수정 및 삭제 가능
-   답변 완료 상태 : 삭제 가능


---


## 8. 데이터 모델 명세

### 8-1. 상품(Product)

Product 객체는 상품 목록, 상품 카드, 상품 상세 진입에 필요한 기본 상품
정보를 기준으로 구성한다.

``` ts
interface Product {
    id: string;
    category: string;
    name: string;
    price: number;
    image: string;
    scent: string;
    isNew: boolean;
    isBest: boolean;
    stock: number;
}
```

필드 설명

-   `id` : 상품 고유 식별자
-   `category` : 상품 카테고리 (hand, body, fragrance, room 등)
-   `name` : 상품명
-   `volume` : 용량 정보
-   `price` : 상품 가격
-   `image` : 대표 이미지 경로
-   `scent` : 향 관련 설명
-   `isNew` : 신상품 여부
-   `isBest` : 베스트 상품 여부
-   `stock` : 재고 수량

### 8-2. 상품 상세 정보(ProductDetail)

상품 상세 페이지에서 사용하는 상세 설명 및 배송 안내 정보는 별도의
모델로 관리한다.

``` ts
interface ProductDetail {
    productId: string;
    description: string;
    shippingInfo: string;
    volumes: string[];
}
```

필드 설명

-   `productId` : 연결된 상품 ID
-   `description` : 상품 설명
-   `shippingInfo` : 배송 및 반품 안내

### 8-3. 후기(Review)

상품 후기는 상품 기본 정보와 분리된 형태로 관리한다.

``` ts
interface Review {
    id: string;
    productId: string;
    user: string;
    date: string;
    rating: number;
    content: string;
}
```

필드 설명

-   `id` : 후기 고유 식별자
-   `productId` : 연결된 상품 ID
-   `user` : 작성자 이름 또는 아이디
-   `date` : 작성 날짜 (ISO 형식 문자열)
-   `rating` : 평점
-   `content` : 후기 내용

### 8-4. 위시리스트(WishlistItem)

위시리스트는 사용자 상태 데이터이므로 상품 모델과 분리해 관리한다.

``` ts
interface WishlistItem {
    id: string;
    productId: string;
}
```

필드 설명

-   `id` : 위시리스트 항목 식별자
-   `productId` : 위시리스트에 추가된 상품 ID

확장 예시

위시리스트는 사용자 데이터와 연결되는 구조이므로 필요에 따라 다음과 같이
확장할 수 있다.

``` ts
interface WishlistItem {
    id: string;
    userId: string;
    productId: string;
}
```

### 8-5. 사용자(User)

``` ts
interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    phone?: string;
    address?: string;
    createdAt: string;
}
```

필드 설명

-   `id` : 사용자 고유 식별자
-   `email` : 로그인 이메일
-   `password` : 사용자 비밀번호
-   `name` : 사용자 이름
-   `phone` : 연락처 (선택)
-   `address` : 기본 배송 주소 (선택)
-   `createdAt` : 계정 생성 날짜

실제 로그인 세션에 저장되는 `user` 객체는 보안상 `password`를 제외한
형태로 관리한다.

### 8-6. 장바구니 아이템(CartItem)

장바구니는 **상품 + 옵션 + 사용자 선택 상태**를 포함한 사용자 상태
데이터이다.

실제 UI 기준으로 다음 필드를 포함한다.

``` ts
interface CartItem {
    cartId: string; // `${productId}-${volume}` (옵션 없는 상품은 volume = "default")
    productId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    giftWrap: boolean;
}
```

필드 설명

-   `cartId` : 장바구니 고유 식별자 (상품ID + 옵션 조합)
-   `productId` : 상품 ID
-   `name` : 상품명
-   `image` : 상품 이미지
-   `volume` : 선택한 옵션 (예: 75ml)
-   `price` : 단가
-   `quantity` : 수량
-   `giftWrap` : 개별 포장 여부

장바구니 금액 계산 규칙

    상품금액 = price * quantity
    총합계 = 모든 상품금액 합계 - 쿠폰

옵션 없는 상품 처리 규칙

-   일부 상품(세트 상품 등)은 용량 선택 옵션이 존재하지 않는다.

-   이 경우 장바구니 정합성을 위해 `volume` 값을 `"default"`로 처리한다.

-   따라서 장바구니 식별자는 다음 규칙을 따른다.

    cartId = productId + "-" + volume

예시

    handbalm-75ml
    handbalm-500ml
    handcare-set-default

할인

### 8-7. 주문(Order)

주문 데이터는 **주문 목록, 주문 상세 모달, 마이페이지 주문내역**에서
공통으로 사용된다.

``` ts
interface Order {
    id: string;
    userId: string;
    items: CartItem[];

    orderType: 'online' | 'offline';
    storeName?: string;

    subtotal: number;
    couponDiscount: number;
    shippingFee: number;
    totalAmount: number;

    samples?: string[];

    receiver: string;
    phone: string;
    zipcode: string;
    address: string;
    detailAddress: string;

    createdAt: string;
    status:
        | '주문접수'
        | '결제완료'
        | '배송준비중'
        | '배송중'
        | '배송완료';
}
```

주문 상세 모달 표시 항목

-   상품 리스트
-   상품 수량
-   상품 가격
-   리뷰쓰기 버튼
-   주문자 정보
-   배송 정보
-   샘플 정보
-   결제 금액 요약

### 8-8. 고객지원 데이터

. 고객지원 데이터

고객지원 관련 데이터는 FAQ와 문의(Inquiry) 구조로 관리한다.

#### FAQ

``` ts
interface FAQ {
    id: string;
    question: string;
    answer: string;
    category: string;
}
```

필드 설명

-   `id` : FAQ 식별자
-   `question` : 질문
-   `answer` : 답변
-   `category` : FAQ 분류

FAQ는 `/board` 페이지에서 아코디언 형태의 리스트 UI로 표시된다.

#### Inquiry (문의)

``` ts
interface Inquiry {
    id: number;
    userId: string;
    title: string;
    content: string;
    date: string;
    status: '답변 대기' | '답변 완료';
}
```

필드 설명

-   `id` : 문의 식별자
-   `userId` : 문의 작성 사용자 ID
-   `title` : 문의 제목
-   `content` : 문의 내용
-   `date` : 작성 날짜
-   `status` : 문의 처리 상태

문의는 `/board` 또는 고객지원 페이지에서 작성되며, 작성된 문의는
`/mypage/inquiry`에서 확인 및 관리할 수 있다.

### 8-9 데이터 모델 구조 요약

현재 데이터 모델은 다음과 같은 구조로 구성된다.

Product ProductDetail Review

User CartItem Order

WishlistItem

FAQ Inquiry

각 모델의 역할은 다음과 같다.

-   Product : 상품 기본 정보
-   ProductDetail : 상품 상세 설명
-   Review : 상품 후기
-   User : 사용자 계정 정보
-   CartItem : 장바구니 데이터
-   Order : 주문 정보
-   WishlistItem : 사용자 위시리스트 상태
-   FAQ : 고객지원 FAQ 데이터
-   Inquiry : 사용자 문의 데이터

데이터 모델은 다음 원칙을 기준으로 설계한다.

-   상품 데이터와 사용자 상태 데이터 분리
-   주문 흐름 데이터 명확화
-   고객지원 데이터 분리
-   확장 가능한 데이터 구조 유지


---


## 9. Zustand 아키텍처

## 9-1. Root Store

`useStore.js` 에서 여러 Slice를 합친다.

-   `createAuthSlice`
-   `createProductSlice`
-   `createCartSlice`
-   `createBoardSlice`
-   `createOrderSlice`
-   `createWishlistSlice`

### 9-2. Persist 설정

``` ts
name: 'aesop-storage';
storage: createJSONStorage(() => localStorage);
```

### 9-3. 실제 partialize 대상

다음만 영속 저장한다.

-   `users`
-   `user`
-   `isLoggedIn`
-   `products`
-   `cartItems`
-   `inquiries`
-   `qnas`
-   `orders`
-   `wishlist`

즉, `filteredProducts`, `currentProduct`, `notices`, `faqs` 같은 값은
영속 대상이 아니다.


---


## 10. Slice별 실제 역할

## 10-1. authSlice

역할:

-   로그인
-   회원가입
-   테스트 회원 생성/로그인
-   로그아웃
-   주소/연락처 수정
-   아이디 찾기
-   비밀번호 찾기 / 재설정

핵심 액션:

-   `login(credentials)`
-   `loginAsTestUser(onlyRegister?)`
-   `signup(userData)`
-   `logout()`
-   `updateUserAddress(userId, newPhone, newAddress)`
-   `findEmail(name, phone)`
-   `findPassword(email, name)`
-   `resetPassword(email, newPassword)`

## 10-2. productSlice

역할:

-   Seed Data 로드
-   상품 상세 조회
-   목록 필터링
-   리뷰 CRUD
-   내가 쓴 리뷰 조회

핵심 액션:

-   `fetchProducts()`
-   `fetchProductById(id)`
-   `setFilters(newFilters)`
-   `clearFilters()`
-   `addReview(productId, review)`
-   `updateReview(productId, reviewId, content, rating)`
-   `deleteReview(productId, reviewId)`
-   `getUserReviews(userName)`

### 10-3. cartSlice

역할:

-   장바구니 담기
-   옵션 조합별 unique cartId 생성
-   수량 수정
-   개별 삭제 / 선택 삭제 / 전체 비우기
-   예전 데이터 보정

핵심 액션:

-   `getSanitizedCart()`
-   `addToCart(product, quantity?)`
-   `updateCartQuantity(cartId, quantity)`
-   `removeFromCart(cartId)`
-   `removeMultipleFromCart(cartIds)`
-   `clearCart()`
-   `getTotalItems()`

## 10-4. orderSlice

역할:

-   결제 완료 주문 저장
-   주문번호 기반 조회
-   로그인 유저 주문 조회

핵심 액션:

-   `addOrder(orderData)`
-   `getOrderById(orderId)`
-   `getUserOrders(userId)`

## 10-5. boardSlice

역할:

-   공지사항 로드
-   FAQ 카테고리 필터 로드
-   1:1 문의 CRUD
-   Q&A CRUD
-   사용자별 문의 조회

핵심 액션:

-   `fetchNotices()`
-   `fetchFAQs(category?)`
-   `submitInquiry(data)`
-   `updateInquiry(id, updateData)`
-   `deleteInquiry(id)`
-   `getUserInquiries(userId)`
-   `submitQna(data)`
-   `updateQna(id, updateData)`
-   `deleteQna(id)`
-   `getUserQnas(userId)`

## 10-6. wishlistSlice

역할:

-   관심상품 토글
-   유저별 리스트 조회
-   특정 상품 찜 여부 확인

핵심 액션:

-   `toggleWishlist(userId, product)`
-   `getUserWishlist(userId)`
-   `isProductWishlisted(userId, productId)`


---


## 11. 공통 레이아웃 구현 기준

## 11-1. App

-   앱 시작 시 `fetchProducts()` 1회 실행
-   글로벌 스타일 `styles/index.scss` 로드
-   `QueryClientProvider` 로 감싸지만 실제 핵심 상태는 Zustand 사용

## 11-2. Layout

구조는 단순하다.

``` tsx
<Header />
<main className="main">
  <Outlet />
</main>
<Footer />
```

## 11-3. Header

필수 요소:

-   좌측 로고 `Aesop`
-   중앙 GNB
    -   AE-GUNG
    -   GIFT
    -   BEST
    -   HAND
    -   BODY
    -   FRAGRANCE
    -   ROOM
-   우측 유틸
    -   Search 아이콘
    -   로그인 시 MyPage 아이콘
    -   Cart 아이콘 + 배지
    -   로그인/로그아웃
    -   모바일 햄버거

필수 동작:

-   Header는 **sticky**
-   모바일 메뉴 열리면 **body scroll lock**
-   Cart 아이콘 배지는 `cartItems.reduce(quantity)` 결과
-   로그인 상태에 따라 util 메뉴가 달라져야 함

### 11-4. 모바일 메뉴

-   태블릿 이하에서 햄버거 노출
-   전체 화면 고정 오버레이 메뉴
-   왼쪽에서 슬라이드 진입
-   메뉴 클릭 시 닫힘

## 11-5. Search Modal

필수 동작:

-   Search 아이콘 클릭 시 전체 화면 검색 모달 오픈
-   overlay 클릭 또는 X 버튼 클릭 시 닫힘
-   검색어 입력 후 submit 하면 `/product` 이동
-   `setFilters({ name: query })` 로 상품 검색
-   최근 검색어는 `recentSearches` 키로 LocalStorage 저장
-   중복 제거 + 최신순 + 최대 5개 유지
-   최근 검색어 개별 삭제 가능

화면 무드:

-   화이트 반투명 오버레이
-   blur 적용
-   큰 uppercase input
-   최근 검색어는 pill 형태

## 11-6. Footer

구성:

-   브랜드 로고/설명
-   SNS 아이콘
-   HELP / COMPANY / POLICIES 3컬럼 링크
-   하단 카피라이트

반응형:

-   Desktop: 2fr / 3fr grid
-   Tablet 이하: 세로 스택
-   Mobile: 각 컬럼 1열


--

## 12. 홈 화면 구현 기준

메인 홈 페이지는 브랜드 소개 역할을 하는 페이지이며 여러 개의 섹션으로 구성된 레이아웃으로 구현한다.

기존 문서에서 설명된 복잡한 인터랙션(GSAP 라인 드로잉, SVG Path 애니메이션 등)은
설계 문서의 필수 범위에서 제외한다.

홈 화면은 **직접 구현하는 영역**으로 두며, 문서에서는 기본 구조와 역할만 정의한다.

### 12-1. 홈 페이지 기본 역할

- 브랜드 분위기 전달
- 주요 상품 및 카테고리로 이동
- 브랜드 스토리 소개

### 12-2. 홈 페이지 섹션 예시

홈은 여러 개의 독립적인 섹션으로 구성될 수 있다.

- Hero
- Brand Story
- Philosophy
- Best Selection
- Gift Guide
- Featured Products
- Closing Message

각 섹션에는 관련 페이지로 이동하는 CTA 버튼을 배치할 수 있다.

예시

Shop → /products  
Gift → /gift  
Brand Story → /brand  

### 12-3. 애니메이션 규칙

홈 화면에서 반드시 구현해야 하는 애니메이션은 정의하지 않는다.

필요한 경우 다음과 같은 **가벼운 UI 효과 정도만 사용한다.**

- hover 효과
- fade in
- 간단한 transition

GSAP 기반 복잡한 인터랙션, SVG Path 드로잉 등은
개발자가 자유롭게 선택적으로 구현할 수 있으며
본 설계 문서의 필수 요구사항에는 포함되지 않는다.

등장

## 13. 상품 목록 페이지 구현 기준

상품 목록 페이지는 카테고리별 브랜드 무드를 보여주는 **Hero 영역**과
실제 상품 탐색을 위한 **탭 / 정렬 / 상품 Grid 영역**으로 구성한다.\
상품 수가 많아 한 화면에 모두 노출되지 않을 경우 사용자는 **스크롤을
통해 페이지 하단까지 상품을 계속 탐색**할 수 있어야 한다.

### 13-1. 페이지 상단 Hero 영역

상품 목록 페이지 상단에는 카테고리별 대표 비주얼 Hero 영역이 존재한다.

구성

-   카테고리 대표 이미지
-   대형 영문 타이포
-   브랜드 무드 중심 비주얼

예시

-   Hand
-   Body
-   Room

규칙

-   현재 진입한 카테고리에 따라 Hero 이미지와 타이포가 달라진다.
-   Hero는 상품 리스트 이전에 브랜드 분위기를 전달하는 역할을 한다.
-   Hero 하단에서 자연스럽게 상품 탐색 영역으로 이어져야 한다.

### 13-2. 카테고리 탭 영역

Hero 하단에는 카테고리 또는 하위 분류를 전환하는 탭 버튼을 배치한다.

구성 예시

-   전체상품
-   핸드워시
-   핸드 밤

규칙

-   탭 클릭 시 해당 카테고리 또는 하위 카테고리 상품만 노출한다.
-   현재 선택된 탭은 강조 스타일을 적용한다.
-   비선택 탭은 테두리 버튼 스타일로 유지한다.

### 13-3. 상품 목록 본문 레이아웃

상품 목록 본문은 **좌측 보조 영역 + 우측 상품 리스트 영역** 구조로
구성한다.

좌측 영역

-   현재 상품 개수 표시
-   세로 라인 또는 레이아웃 보조 영역

우측 영역

-   정렬 Dropdown
-   상품 Grid

레이아웃 규칙

-   좌측 영역은 필터 패널이 아니라 정보 표시와 레이아웃 균형 역할을
    한다.
-   우측 영역이 실제 상품 탐색 영역이다.
-   상품 수가 많을 경우 페이지는 아래로 확장되며 스크롤로 탐색한다.

### 13-4. 정렬 기능

상품 리스트 우측 상단에는 정렬 Dropdown을 배치한다.

예시

-   기본 추천순
-   낮은 가격순
-   높은 가격순
-   신상품순

규칙

-   선택된 정렬 기준에 따라 상품 순서를 변경한다.
-   기본값은 `기본 추천순`이다.

### 13-5. 상품 Grid 구조

상품은 Grid 형태로 노출한다.

규칙

-   Desktop: 4열
-   Tablet: 3열
-   Mobile: 2열

추가 규칙

-   상품 간 간격은 넓고 정돈된 느낌을 유지한다.
-   상품 수에 따라 페이지 길이는 자연스럽게 확장된다.
-   기본 탐색 방식은 페이지 스크롤이다.

### 13-6. 상품 카드 구성

상품 카드에는 다음 요소가 포함된다.

구성

-   상품 이미지
-   배지 (NEW, BEST, SET)
-   북마크 또는 찜 아이콘
-   향 또는 특징 요약 문구
-   상품명
-   옵션 영역 (용량 선택 또는 옵션 정보)
-   가격

동작 규칙

-   **상품 이미지 클릭 → 상품 상세 페이지 이동**
-   **가격 클릭 → 장바구니 담기**

라우트 기준

-   `/product/:id`

### 13-7. 옵션 표시 및 선택 규칙

상품 목록 카드에서 옵션은 기본적으로 **용량(volume) 선택**을 의미한다.

옵션 예시

-   75ml
-   500ml
-   500ml (펌프 포함)
-   500ml (펌프 미포함)

규칙

-   상품 카드에서 사용자는 용량 옵션을 선택할 수 있다.
-   선택된 용량에 따라 **가격이 변경된다.**
-   가격 클릭 시 현재 선택된 옵션 기준으로 장바구니에 담긴다.

정합 규칙

-   장바구니 식별 기준은 `productId + volume`이다.

### 13-8. 재고 기반 옵션 제어

옵션은 재고 상태에 따라 선택 가능 여부가 달라진다.

규칙

-   재고가 있는 옵션만 선택 가능하다.
-   재고가 없는 옵션은 선택할 수 없다.

UI 표현

-   품절 옵션은 비활성 상태로 표시한다.
-   품절 옵션은 클릭할 수 없다.
-   품절 옵션은 장바구니에 담을 수 없다.

예시

-   500ml (펌프 포함)
-   500ml (펌프 미포함) \[품절\]

### 13-9. 옵션 선택이 필요 없는 상품

일부 상품은 용량 선택이 필요 없는 고정 구성 상품이다.

예시

-   세트 상품
-   고정 구성 상품

규칙

-   옵션 선택 UI 대신 구성 정보만 표시한다.
-   가격은 고정 가격으로 표시한다.
-   가격 클릭 시 바로 장바구니에 담긴다.

### 13-10. 가격 클릭 동작

가격 영역은 장바구니 담기 CTA 역할을 한다.

규칙

-   용량 선택 상품: 현재 선택된 용량 기준으로 장바구니 담기
-   옵션 선택 불필요 상품: 기본 구성 그대로 장바구니 담기

### 13-11. 상품 개수 표시

본문 좌측에는 현재 노출 중인 상품 수를 표시한다.

예시

-   (38 제품)

규칙

-   현재 카테고리 / 탭 / 정렬 기준 결과를 반영한다.

### 13-12. 빈 상태 처리

조건에 맞는 상품이 없을 경우 빈 상태 메시지를 표시한다.

예시

-   해당 조건의 상품이 없습니다.

규칙

-   Hero 영역과 탭 영역은 유지한다.
-   상품 Grid 영역에만 메시지를 표시한다.

### 13-13. 페이지 이동 규칙

상품 목록 페이지 진입 방식은 다음을 기준으로 한다.

예시

-   /product
-   /product/hand
-   /product/body
-   /product/room

규칙

-   경로에 따라 Hero 이미지와 기본 탭 상태가 달라질 수 있다.
-   카테고리 진입 시 해당 카테고리 상품이 우선 노출된다.

### 13-14. 스타일 무드

상품 목록 페이지는 이솝 무드에 맞춰 아래 원칙을 따른다.

원칙

-   큰 Hero 이미지와 절제된 타이포
-   얇은 보더 스타일
-   브라운 계열 포인트 컬러
-   넓은 여백
-   정돈된 Grid 레이아웃
-   조용하고 고급스러운 탐색 경험 유지

## 14. ProductItem 카드 기준

ProductItem 카드는 상품 목록 페이지에서 사용되는 핵심 카드 UI이다.\
카드는 **상품 이미지 / 배지 / 위시리스트 버튼 / 상품 요약 정보 / 상품명
/ 옵션(용량) 버튼 / 가격**으로 구성된다.

### 14-1. 액션 버튼

카드에서 동작하는 주요 액션은 다음과 같다.

1.  이미지 클릭
    -   상품 상세 페이지로 이동한다.
2.  가격 클릭
    -   현재 선택된 옵션 기준으로 장바구니에 담긴다.
3.  `Heart` 버튼
    -   비로그인 시 로그인 유도 Alert\
    -   로그인 시 찜 토글\
    -   하단 우측 toast 표시

### 14-2. 카드 기본 구성

카드는 다음 요소로 구성된다.

구성

-   상품 이미지
-   `NEW` / `BEST` 배지
-   위시리스트 버튼
-   상품 요약 정보 문구
-   상품명
-   옵션(용량) 버튼
-   가격

규칙

-   카드 레이아웃은 세로형 구조를 따른다.
-   이미지 영역이 카드에서 가장 큰 비중을 차지한다.
-   정보 영역은 옵션 선택과 장바구니 담기가 가능하도록 구성한다.

### 14-3. 이미지 표시 규칙

상품 카드는 기본 대표 이미지를 노출한다.

규칙

-   최초 진입 시 기본 상품 이미지를 표시한다.
-   카드에서 **이미지 영역 클릭 시 상품 상세 페이지로 이동**한다.
-   이미지 영역은 카드에서 가장 시각적으로 강조되는 영역이다.

라우트

-   `/product/:id`

### 14-4. 이미지 Hover 동작

데스크탑 환경에서는 hover 시 보조 이미지로 전환할 수 있다.

규칙

-   보조 이미지가 존재할 경우 hover 시 이미지가 변경된다.
-   보조 이미지가 없으면 기본 이미지를 유지한다.
-   hover 전환은 과도하지 않은 자연스러운 방식으로 처리한다.

### 14-5. 옵션(용량) 선택 UI

옵션은 **버튼 UI**로 구성한다.

옵션 예시

-   `75ml`
-   `500ml`
-   `500ml (펌프 포함)`
-   `500ml (펌프 미포함)`

규칙

-   옵션은 모두 버튼 형태로 표시한다.
-   옵션 텍스트는 용량 또는 용량 + 펌프 여부를 포함할 수 있다.
-   선택된 옵션은 강조 스타일을 적용한다.
-   재고가 없는 옵션은 비활성 상태로 표시하며 선택할 수 없다.

### 14-6. 옵션 선택에 따른 이미지 교체

옵션 변경 시 해당 옵션 이미지가 존재하면 카드 이미지도 함께 변경할 수
있다.

규칙

-   선택한 옵션에 대응되는 이미지가 있으면 카드 이미지가 해당 이미지로
    교체된다.
-   대응 이미지가 없으면 기본 이미지를 유지한다.
-   옵션 변경에 따른 이미지 교체는 hover 이미지보다 우선 적용된다.

### 14-7. 가격 표시 규칙

가격은 현재 선택된 옵션 기준으로 표시한다.

규칙

-   옵션 선택 전에는 기본 옵션 기준 가격을 표시한다.
-   옵션 변경 시 가격도 함께 갱신된다.
-   가격 영역은 단순 텍스트가 아니라 **장바구니 담기 CTA** 역할을 한다.

### 14-8. 상품 요약 정보 문구

상품명 위에는 상품 특성을 보여주는 요약 정보 문구를 표시한다.

표시 방식

-   향 정보
-   사용감 + 향 정보
-   짧은 설명 문구

예시

-   허브, 우디, 스파이시
-   부드럽고 산뜻한 사용감, 시트러스 향
-   손 피부를 부드럽게 가꿔주는 핸드 밤

규칙

-   상품마다 표시 형식이 다를 수 있다.
-   보조 정보 역할이며 상품명보다 강조하지 않는다.

### 14-9. 상품명 표시

상품명은 카드 정보 영역의 핵심 텍스트다.

규칙

-   한 줄로 표시한다.
-   영역을 초과하면 말줄임 처리한다.
-   상품 요약 정보 아래에 배치한다.

### 14-10. 카드 동작 우선순위

카드에는 여러 인터랙션이 존재하므로 클릭 영역을 분리한다.

동작 규칙

-   이미지 클릭 → 상품 상세 페이지 이동
-   옵션 버튼 클릭 → 옵션 변경
-   가격 클릭 → 장바구니 담기
-   Heart 버튼 클릭 → 위시리스트 토글

### 14-11. 스타일 무드

ProductItem 카드는 이솝 무드에 맞게 다음 원칙을 따른다.

원칙

-   넓은 여백
-   절제된 브라운 계열 포인트
-   얇은 보더
-   정돈된 카드 레이아웃
-   과도한 인터랙션보다 절제된 고급감 유지

## 15. 상품 상세 페이지 구현 기준

상품 상세 페이지는 사용자가 상품 정보를 확인하고 옵션을 선택한 후
장바구니에 담기 위한 페이지이다. 페이지는 **좌측 상품 이미지 영역 + 우측
상품 정보 영역**의 2열 레이아웃으로 구성된다.

구성

-   상품 이미지
-   상품명
-   가격
-   배송 정보
-   옵션 선택
-   장바구니 버튼
-   탭 영역
-   상세 콘텐츠
-   추천 상품

### 15-1. 페이지 레이아웃

상품 상세 페이지는 **좌측 이미지 / 우측 정보** 구조로 구성한다.

좌측 영역 - 상품 대표 이미지 - 옵션 선택에 따른 이미지 변경

우측 영역 - 상품명 - 가격 - 재고 상태 - 배송 정보 - 옵션 선택 - 장바구니
버튼

규칙 - 좌측 이미지 영역이 시각적으로 가장 큰 비중을 차지한다. - 우측
영역은 상품 구매를 위한 핵심 정보 영역이다.

### 15-2. 상품 이미지

좌측에는 상품 대표 이미지를 표시한다.

구성 - 대표 상품 이미지 - 옵션별 이미지

규칙 - 기본적으로 대표 이미지를 먼저 표시한다. - 옵션 선택 시 해당 옵션
이미지가 존재하면 이미지가 변경된다. - 옵션 이미지가 없으면 기본
이미지를 유지한다.

예시

500ml (펌프 포함) → 펌프가 있는 병 이미지

500ml (펌프 미포함) → 펌프가 없는 병 이미지

75ml → 튜브형 제품 이미지

카테고리별 이미지 규칙

Body / Hand 제품 - 옵션에 따라 제품 형태 이미지가 변경될 수 있다.

Fragrance / Room 제품 - 제품 형태 변화보다 다른 구도 또는 컷의 이미지가
사용될 수 있다.

### 15-3. 상품 정보 영역

상품 이미지 우측에는 상품 핵심 정보를 표시한다.

구성 - 상품명 - 가격 - 재고 정보 - 배송 정보

규칙 - 상품명은 가장 강조되는 텍스트다. - 가격은 상품명 아래에
표시한다. - 재고 정보는 보조 정보로 표시한다.

### 15-4. 옵션 선택

상품 옵션은 **버튼 UI**로 제공한다.

옵션 예

-   75ml
-   500ml
-   500ml (펌프 포함)
-   500ml (펌프 미포함)

규칙

-   옵션은 버튼 형태로 표시한다.
-   선택된 옵션은 강조 스타일을 적용한다.
-   재고 없는 옵션은 비활성 처리한다.
-   옵션 선택 시 가격과 이미지가 함께 변경된다.

정합 규칙

옵션 = volume

기본값

-   기본 선택 옵션은 **첫 번째 옵션**으로 설정한다.

### 15-5. 장바구니 버튼

옵션 아래에는 장바구니 버튼을 배치한다.

구성

-   장바구니 담기 버튼

동작

-   클릭 시 현재 선택된 옵션 기준으로 장바구니에 담긴다.

규칙

-   옵션이 존재하는 상품은 옵션 선택 상태 기준으로 장바구니에 담긴다.
-   옵션이 없는 상품은 기본 구성 그대로 장바구니에 담긴다.

장바구니 식별 기준

cartId = productId + volume

옵션 없는 상품

volume = default

### 15-6. 탭 영역

상품 정보 아래에는 콘텐츠 탭이 존재한다.

탭 종류

-   제품 상세
-   배송 안내
-   후기

규칙

-   선택된 탭은 진하게 표시한다.
-   선택되지 않은 탭은 연하게 표시한다.
-   기본 선택 탭은 **제품 상세**이다.

### 15-7. 제품 상세 콘텐츠

제품 상세 탭에는 상품에 대한 상세 정보가 표시된다.

구성

1.  향을 떠올릴 수 있는 이미지와 설명 텍스트
2.  사용 방법 텍스트 설명
3.  제품 특징 정보

제품 특징 정보는 **좌측 이미지 / 우측 텍스트** 구조로 구성한다.

내용

-   질감
-   향
-   주요 성분

4.  패키징 정보

구성

-   패키지 이미지
-   리사이클 안내 텍스트

하단

-   함께 사용하면 좋은 제품 (슬라이드)

### 15-8. 배송 안내 탭

배송 안내 탭에는 배송 및 교환 관련 정보를 표시한다.

구성

-   배송 안내
-   교환 및 반품 안내
-   오프라인 매장 교환 서비스

콘텐츠 하단

-   함께 사용하면 좋은 제품 (슬라이드)

### 15-9. 후기 탭

후기 탭에는 상품 리뷰가 표시된다.

구성

-   리뷰 제목
-   작성자
-   리뷰 내용

리뷰 작성

리뷰 작성은 **마이페이지 주문 내역**에서 가능하다.

경로

마이페이지 → 주문 내역 → 주문 상세 → 리뷰 작성

리뷰 권한

-   자신의 리뷰일 경우 **Edit / Delete 버튼**이 표시된다.

콘텐츠 하단

-   함께 사용하면 좋은 제품 (슬라이드)

## 16. 장바구니 페이지 구현 기준

장바구니 페이지는 사용자가 담은 상품을 확인하고 옵션(용량), 수량, 포장
여부를 수정한 뒤 결제 단계로 이동하기 위한 페이지이다. 페이지는 **좌측
상품 영역 + 우측 결제 요약 영역**의 2열 레이아웃으로 구성된다.

### 16-1. Step UI

Checkout 진행 단계를 표시한다.

1 장바구니\
2 결제정보입력\
3 주문완료

규칙

-   현재 단계 강조
-   이전 단계 완료 표시
-   이후 단계 비활성

### 16-2. 장바구니 초기화

페이지 최초 진입 시 장바구니 데이터 정합성 확인

동작

-   `getSanitizedCart()` 실행
-   cartId 없는 기존 데이터 자동 보정

### 16-3. 장바구니 상품 리스트

상품 카드 표시 정보

-   상품 이미지
-   상품명
-   옵션(용량)
-   개별 포장 선택
-   수량 변경
-   삭제 버튼
-   가격

### 16-4. 옵션 변경

옵션은 드롭다운으로 변경 가능

예시

75ml ▼

옵션 변경 시

-   선택한 volume 값으로 변경된다.
-   quantity는 기본값 `1`로 초기화된다.
-   cartId는 `productId-volume` 기준으로 다시 계산된다.
-   가격 업데이트
-   총 금액 자동 재계산

### 16-5. 개별 포장 선택

상품 카드에 개별 포장 선택 버튼 존재

표시 방식

개별 포장 ○\
개별 포장 ✔

규칙

-   체크 시 개별 포장
-   체크 해제 시 일반 포장
-   추가 비용 없음

데이터 구조 예시

``` ts
type CartItem = {
  cartId: string
  productId: string
  name: string
  image: string
  volume: string
  price: number
  quantity: number
  giftWrap: boolean
}
```

### 16-6. 수량 변경

수량 UI

-   -   버튼
-   수량 표시
-   -   버튼

수량 변경 시

-   상품 금액 자동 계산
-   총 결제 금액 갱신

### 16-7. 상품 삭제

삭제 버튼

X

삭제 시 확인 메시지 표시 (alert / toast / modal / inline message)

예시 메시지

정말 삭제하시겠습니까?

### 16-8. 무료 샘플 선택

상품 리스트 하단에 무료 샘플 선택 영역 존재

규칙

-   총 4개의 샘플 리스트 중 최대 3개까지 선택 가능
-   표시는 현재 선택 개수 / 총 선택 가능 개수 방식으로 노출

예시

무료 샘플을 추가해주세요 2/3

데이터 구조 예시

``` ts
type SampleItem = {
  id: string
  name: string
  image: string
}
```

### 16-9. 함께 보면 좋은 제품

장바구니 하단 추천 상품 영역

규칙

-   최대 4개 노출
-   ProductItem 카드 UI 사용

장바구니 아이콘

-   현재 기준: 상품 상세 페이지 이동
-   향후 확장: 아이콘 클릭 시 바로 장바구니 추가

### 16-10. 결제 요약 영역

우측 영역 구성

-   쿠폰 적용 (장바구니 단계에서만 선택 가능)
-   결제 금액
-   주문하기 버튼

### 16-11. 배송비 규칙

전 상품 무료배송

표시 방식

배송비 : 무료

계산 규칙

합계 = 상품 금액 - 장바구니에서 적용된 쿠폰 할인

### 16-12. 주문하기

버튼

주문하기

동작

Step 2 결제정보입력 단계로 이동

### 16-13. 향후 확장 기능

현재 구현 범위에는 포함되지 않았지만 추후 추가 가능

선택 주문 기능 예시

☑ 상품1\
☐ 상품2\
☑ 상품3

현재 기준

전체 상품 주문


---


## 17. 결제 정보 입력 페이지 구현 기준

결제 정보 입력 페이지는 주문자 정보, 배송 정보, 결제 수단을 입력하는
페이지이다. 페이지는 **좌측 입력 영역 + 우측 주문 요약 영역**으로
구성된다.

### 17-1. Checkout 진입 규칙

Checkout 진입 시 주문 대상은 **장바구니(cartItems) 전체 상품**이다.

규칙

-   주문 대상은 항상 `cartItems` 전체이다.
-   장바구니 상품이 없으면 이전 페이지 또는 `/product`로 이동한다.
-   결제정보입력 단계에서는 장바구니 전체 상품을 기준으로 주문 요약을
    표시한다.

### 17-2. 주문자 정보

입력 항목

-   이름
-   전화번호
-   이메일

버튼

수정하기

### 17-3. 배송 정보

입력 항목

-   이름
-   전화번호
-   이메일
-   배송 메모

배송 요청사항 Dropdown

### 17-4. 결제 수단 선택

일반 결제

-   카드사 선택
-   할부 선택

간편 결제

-   네이버페이
-   카카오페이
-   삼성페이

### 17-5. 주문 상품 요약

우측 영역 표시

-   상품 이미지
-   상품명
-   옵션
-   가격

### 17-6. 결제 금액

표시 항목

상품 금액\
쿠폰 할인 (장바구니에서 적용된 쿠폰 확인)\
배송비 무료\
합계

### 17-7. 결제 완료 처리

1.  `newOrder` 생성
2.  `addOrder(newOrder)` 실행
3.  주문 상품 장바구니 제거
4.  주문 완료 페이지 이동

### 17-8. Guest 결제 한계

비회원 주문 시 주문 데이터는 guest로 저장

UX 보완 방법

1.  Checkout 로그인 필수
2.  별도 주문완료 페이지 제공


---


## 18. 주문 완료 페이지 구현 기준

결제 완료 후 사용자에게 주문 성공을 안내하는 페이지

### 18-1. 화면 구성

-   완료 아이콘
-   주문 완료 메시지
-   버튼 2개

### 18-2. 메시지

주문이 완료되었습니다\
이솝의 지속 가능한 운영에 동참해주셔서 감사합니다.

### 18-3. 버튼

메인페이지로 가기\
주문내역 보기

### 18-4. 목적

사용자에게 주문 완료 상태 전달 및 다음 행동 유도


---


## 19. 인증 페이지 구현 기준

인증 페이지는 로그인, 회원가입, 계정 찾기 기능을 제공한다. 로그인 / 계정
찾기 페이지는 **좌측 브랜드 이미지 + 우측 입력 영역**의 동일한
레이아웃을 사용한다.

### 19-1. 로그인

구성

-   EMAIL
-   PASSWORD
-   테스트 계정 버튼
-   이메일 찾기 / 비밀번호 찾기
-   Log in 버튼
-   Sign in 버튼
-   SNS 로그인

동작

-   `login(credentials)` 호출
-   로그인 성공 시 홈 페이지 이동

입력 검증

-   EMAIL 입력값이 없으면 `이메일주소를 입력해주세요.` 메시지를 입력
    필드 하단에 표시
-   EMAIL 형식이 올바르지 않으면 `이메일 주소가 유효하지 않습니다.`
    메시지를 입력 필드 하단에 표시
-   PASSWORD 입력값이 없으면 `비밀번호를 입력해주세요.` 메시지를 입력
    필드 하단에 표시

포커스 이동 규칙

-   EMAIL 입력값이 없으면 EMAIL 입력 필드로 포커스를 이동
-   EMAIL 형식이 올바르지 않으면 EMAIL 입력 필드에 포커스를 유지
-   EMAIL이 정상이고 PASSWORD 입력값이 없으면 PASSWORD 입력 필드로
    포커스를 이동

Validation 규칙

-   EMAIL: 일반적인 이메일 형식 (`example@domain.com`)
-   PASSWORD: 최소 8자 이상

예외 처리

-   이메일 또는 비밀번호가 일치하지 않으면 오류 메시지 표시 (alert /
    toast / modal / inline message)

사용 store / 함수

-   `login(credentials)`
-   `loginAsTestUser(onlyRegister?)`

### 19-2. 테스트 계정

구성

-   테스트 계정 버튼

동작

-   버튼 클릭 시 테스트 계정 정보 자동 입력
-   사용자가 Log in 버튼을 눌러 로그인

예시 계정

``` txt
test@aesop.com
test1234
```

### 19-3. SNS 로그인

UI 구성

-   네이버
-   카카오
-   구글

구현 범위

-   카카오 로그인을 실제 연동한다.
-   네이버 / 구글 로그인은 현재 UI 버튼만 제공한다.
-   추후 OAuth 확장 가능 구조로 설계한다.

### 19-4. 회원가입

구성

-   NAME
-   EMAIL
-   PHONE NUMBER
-   PASSWORD
-   CONFIRM PASSWORD
-   CREATE ACCOUNT 버튼

동작

-   `signup(userData)` 호출
-   회원가입 성공 시 `/login` 이동

입력 검증

-   NAME 입력값이 없으면 `이름을 입력해주세요.` 메시지 표시
-   EMAIL 입력값이 없으면 `이메일주소를 입력해주세요.` 메시지 표시
-   EMAIL 형식이 올바르지 않으면 `이메일 주소가 유효하지 않습니다.`
    메시지 표시
-   PHONE NUMBER 입력값이 없으면 `전화번호를 입력해주세요.` 메시지 표시
-   PASSWORD 입력값이 없으면 `비밀번호를 입력해주세요.` 메시지 표시
-   CONFIRM PASSWORD 입력값이 없으면 `비밀번호 확인을 입력해주세요.`
    메시지 표시
-   PASSWORD와 CONFIRM PASSWORD가 일치하지 않으면
    `비밀번호가 일치하지 않습니다.` 메시지 표시

포커스 이동 규칙

-   첫 번째 오류 입력 필드로 포커스를 이동

Validation 규칙

-   EMAIL: 일반적인 이메일 형식 (`example@domain.com`)
-   PHONE NUMBER: `010-XXXX-XXXX` 형식
-   PASSWORD: 최소 8자 이상

예외 처리

-   이메일 중복 시 오류 메시지 표시 (alert / toast / modal / inline
    message)

사용 store / 함수

-   `signup(userData)`

### 19-5. 사용자 데이터 구조

회원가입 시 아래 형태의 사용자 데이터가 생성된다.

``` ts
type User = {
  id: string
  name: string
  email: string
  phone: string
  password: string
  createdAt: string
}
```

### 19-6. 계정 찾기

계정 찾기 페이지는 탭 구조로 구성된다.

탭 구조

-   이메일 찾기
-   비밀번호 찾기

### 19-7. 이메일 찾기

입력 항목

-   NAME
-   PHONE NUMBER

동작

1.  이름 + 전화번호 검증
2.  일치하는 계정이 있으면 이메일 표시

예외 처리

-   일치하는 계정이 없으면 안내 메시지 표시 (toast / modal / inline
    message)

Validation 규칙

-   PHONE NUMBER: `010-XXXX-XXXX` 형식

사용 store / 함수

-   `findEmail(name, phone)`

### 19-8. 비밀번호 찾기

입력 항목

-   EMAIL
-   PHONE NUMBER

동작

1.  이메일 + 전화번호 검증
2.  일치하는 계정이 있으면 새 비밀번호 입력 단계로 전환
3.  새 비밀번호 / 확인 입력
4.  일치하면 `resetPassword` 실행
5.  성공 후 로그인 페이지 이동

예외 처리

-   일치하는 계정이 없으면 안내 메시지 표시 (toast / modal / inline
    message)
-   새 비밀번호와 확인 비밀번호가 일치하지 않으면 오류 메시지 표시
    (alert / toast / modal / inline message)

Validation 규칙

-   EMAIL: 일반적인 이메일 형식 (`example@domain.com`)
-   PHONE NUMBER: `010-XXXX-XXXX` 형식
-   NEW PASSWORD: 최소 8자 이상

사용 store / 함수

-   `findPassword(email, name)`
-   `resetPassword(email, newPassword)`


---


# 20. 마이페이지 구현 기준

마이페이지는 사용자 계정 관리와 주문/문의 관리 기능을 제공하는
페이지이다.

구조는 다음과 같다.

    마이페이지
    ├─ 마이페이지 홈
    ├─ 주문내역
    ├─ 위시리스트
    └─ 문의하기

## 20-1. 접근 가드

비로그인 접근 시

    SweetAlert 안내 → /login 이동

## 20-2. 기본 레이아웃

좌측 사이드바 + 우측 콘텐츠

사이드바 메뉴

-   마이페이지
-   주문내역
-   위시리스트
-   문의하기

## 20-3. 마이페이지 홈

표시 영역

### 개인 정보

-   이름
-   이메일
-   생년월일
-   성별

### 배송 정보

-   전화번호
-   우편번호
-   국가
-   기본 주소
-   상세 주소

배송 정보는 **결제 페이지 기본 배송지로 사용된다.**

## 20-4. 정보 수정 방식

기본 상태

    읽기 모드

수정 방식

-   필드 클릭 시 수정 가능
-   상단 `Edit` 버튼 클릭 시 저장

## 20-5. 비밀번호 변경

입력 항목

-   현재 비밀번호
-   새 비밀번호
-   비밀번호 확인

버튼 hover 시 텍스트 색상이 진해진다.

## 20-6. 주문내역

표시 컬럼

-   구입일자
-   상품
-   구매금액
-   상태

버튼

    상세보기

## 20-6-1 주문 상세보기

상세보기 클릭 시 모달 표시

주문 유형

-   온라인 구매
-   오프라인 구매

공통 표시 정보

-   주문번호
-   상품 리스트
-   상품 수량
-   상품 가격
-   리뷰쓰기 버튼
-   영수증보기
-   문의하기 버튼

주문 유형에 따라 아래 항목은 다르게 표시된다.

-   결제 금액 상세
-   주문자 정보
-   배송 정보
-   샘플
-   개별 포장

## 20-6-2 오프라인 구매 상세 규칙

오프라인 구매 주문은 매장에서 직접 결제된 주문 기록이다.\
배송 과정이 존재하지 않으며 매장명이 표시된다.

표시 항목

-   주문번호
-   오프라인 구매 표시
-   매장명
-   상품 리스트
-   상품 수량
-   상품 가격
-   리뷰쓰기 버튼
-   상품합계금액
-   영수증보기
-   문의하기

표시되지 않는 항목

-   최종결제금액 상세
-   쿠폰 정보
-   배송비
-   추가 샘플
-   주문자 정보
-   배송 정보
-   배송메모
-   개별 포장

UI 규칙

-   상단에 `오프라인 구매 | 매장명` 형태로 표시
-   배송 관련 섹션은 렌더링하지 않는다

## 20-6-3 온라인 구매 상세 규칙

온라인 구매 주문은 쇼핑몰 결제를 통해 생성된 주문이다.

표시 항목

-   주문번호
-   온라인 구매 표시
-   상품 리스트
-   상품 수량
-   상품 가격
-   리뷰쓰기 버튼
-   개별 포장 표시
-   상품합계금액
-   최종결제금액 상세
-   추가한 샘플
-   주문자 정보
-   배송 정보
-   배송메모
-   영수증보기
-   문의하기

결제 금액 구조

상품 금액\
쿠폰 할인\
배송비\
합계

배송 정보 구조

-   수령인
-   전화번호
-   주소
-   상세 주소
-   배송메모

## 20-7 위시리스트

ProductItem Grid

동작

-   하트 클릭 → 삭제
-   상품 클릭 → 상세 페이지 이동

## 20-8 문의하기

문의 리스트

-   상태
-   제목
-   수정
-   삭제

## 20-8-1 문의 상세보기

표시 항목

-   문의 제목
-   주문번호
-   작성일
-   문의 내용
-   답변

# 21. 고객지원 페이지 구현 기준

고객지원 페이지는 사용자가 주문, 배송, 제품 관련 정보를 확인하고 문의
채널을 찾을 수 있도록 제공되는 페이지이다.

라우트

/support

페이지 기본 구조

Hero 영역\
FAQ 영역\
Contact 영역

단, 일부 기능은 정책 확정 전까지 UI만 존재할 수 있다.


---


## 21-1 Hero 영역

페이지 상단에는 고객지원 안내 Hero 영역이 존재한다.

구성

-   배경 이미지
-   제목
-   설명 텍스트
-   CTA 버튼

제목

아로마 가이드

설명

온라인에서 향수를 구매하는 것은 때때로 어려울 수 있습니다.\
이솝 컨설턴트 상담을 통해 개인에게 어울리는 향을 선택할 수 있도록 도움을
드립니다.

버튼

컨설턴트 상담하기

동작

현재 연결 방식은 확정되지 않았다.

가능한 방식

-   챗봇 상담
-   외부 상담 페이지
-   상담 안내 페이지


---


## 21-2 FAQ 영역

FAQ는 고객지원 페이지의 핵심 기능이며 Accordion UI로 구현한다.

데이터 로딩

FAQ 데이터는 Seed Data에서 로드한다.

사용 함수

fetchFAQs()

예시

``` ts
export function fetchFAQs() {
  return faqData
}
```

데이터 구조

``` ts
interface FAQ {
  id: string
  question: string
  answer: string
}
```

UI 동작

-   질문 클릭 시 답변 영역 확장
-   다른 질문 클릭 시 기존 질문 닫힘
-   한 번에 하나의 FAQ만 열린다

예시 상태 관리

``` ts
const [openId, setOpenId] = useState<string | null>(null)
```


---


## 21-3 Contact 영역

페이지 하단에는 고객 지원 연락 정보를 표시한다.

구성

-   직접 문의
-   전화
-   즉각적인 지원

### 직접 문의

설명

주문 및 제품 관련 문의는 이메일 또는 문의 시스템을 통해 접수할 수 있다.

버튼

이메일 보내기

동작

현재 연결 방식은 확정되지 않았다.

가능한 방식

-   이메일 링크
-   마이페이지 문의하기 이동
-   별도 문의 작성 페이지

### 전화

전화번호

+61 3 9412 8900

운영 시간

월요일 \~ 금요일\
오전 9:00 \~ 오후 5:00

### 즉각적인 지원

설명

실시간 상담을 통해 고객 지원을 받을 수 있다.

버튼

채팅 시작하기

동작

현재 연결 방식은 확정되지 않았다.

가능한 방식

-   챗봇
-   라이브 채팅
-   외부 상담 서비스


---


## 문의 기능 구조 정리

문의 시스템은 마이페이지의 `/mypage/inquiry` 를 중심으로 관리한다.

마이페이지 문의 기능

-   문의 작성
-   문의 상세 조회
-   문의 수정 / 삭제
-   답변 상태 확인

고객지원 페이지의 문의 관련 버튼은 문의 채널 안내 역할을 한다.

직접 문의, 컨설턴트 상담하기, 채팅 시작하기 버튼의 실제 연결 방식은 추후
확정한다.

# 22. 폴더 구조 기준

``` bash
src/
  assets/
    api/
      boardData.js     # 공지사항(Notice) 및 FAQ 초기 모의 데이터 배열
      productData.js   # 카테고리별(Outer, Top 등) 상품 상세 리뷰 및 속성 데이터 집합
  common/
    footer/
      index.jsx        # 하단 푸터 영역 렌더링
    header/
      index.jsx        # 상단 GNB, Hamburger 메뉴 제어 및 스크롤 방지 로직
      NavBar.jsx       # 주요 카테고리 라우팅 메뉴 리스트
      SearchModal.jsx  # 검색 팝업, localStorage 최근 검색어 저장/불러오기
      SearchModal.scss # 검색창 모달 스타일 및 애니메이션
    Layout.jsx         # 전역 레이아웃 래퍼 (Header + Outlet + Footer)
  components/
    product/
      ProductItem.jsx  # 개별 상품 썸네일, 배지(New/Sale), 하버 액션
      ProductList.jsx  # 여러 ProductItem을 Grid 형태로 매핑
    ui/                # 재사용 버튼, 모달 등 UI 단위 컴포넌트 모음
  pages/
    about/             # 브랜드 스토리 정적 콘텐츠 페이지
      style.scss
    board/             # 고객지원 게시판
      FAQ.jsx          # 아코디언 방식의 자주 묻는 질문
      Inquiry.jsx      # (미사용) 1:1 문의 폼 구조
      Notice.jsx       # 일반 공지사항 테이블 뷰
      style.scss       # 게시판 공통 스타일
    cart/              # 장바구니
      index.jsx        # 아이템 수량 조절, 단일/전체 체크, 삭제 로직
      style.scss       # 2단 레이아웃 및 모바일 반응형 처리
    checkout/          # 결제 프론트엔드
      index.jsx        # 결제수단 선택, react-daum-postcode 우편번호 연동
      style.scss
    home/              # 메인 랜딩
      components/
        BestSection.jsx # isBest 필터링 최상위 상품 스와이퍼/그리드
        Visual.jsx     # 메인 히어로 배너 스와이퍼 연동
      index.jsx
      style.scss
    login/             # 유저 검증
      index.jsx        # 로그인 입력 폼 및 Redux/Zustand 인증 로직 트리거
      Signup.jsx       # 회원가입 시 유효성 검사 폼
      style.scss
    mypage/            # 통합 마이페이지 (사용자 포털)
      index.jsx        # 내가 쓴 글(리뷰, QnA), 주문 내역 조회 및 상태 탭 스위치
      style.scss
    product/           # 쇼핑 도메인
      index.jsx        # 카테고리 구분(URL 파라미터)에 따른 productData 리스트 매핑
      ProductDetail.jsx # 단일 상품 상세정보, color/size 옵션 및 리뷰(별점) CRUD 통신
      style.scss
      detail.scss
  store/
    slices/            # 비즈니스 도메인별 상태(State) 로직 파편화
      authSlice.js     # 가입/로그인 유저 세션
      boardSlice.js    # 1:1문의, QnA, Notice 작성 데이터 보관
      cartSlice.js     # 장바구니 아이템 담기/수정/삭제
      orderSlice.js    # 결제 완료된 영수증 및 주문 로그
      productSlice.js  # 메인 검색 필터 및 활성화된 상품 리스트
      wishlistSlice.js # 유저 찜하기(Like) 배열 제어
    useStore.js        # slices들을 Root로 엮고 aesop-storage 키값으로 persist 선언
  styles/
    base/              # _default.scss (body), _fonts.scss (Pretendard), _reset.scss
    components/        # _product.scss 등 공유 UI SCSS
    layout/            # _header.scss, _footer.scss, _main.scss (inner 컨테이너)
    utils/             # _font.scss(mixin), _media.scss(반응형), _palette.scss
    _swal.scss         # SweetAlert2 프롬프트 팝업 오버라이드 커스텀
    index.scss         # styles 전체 취합 엔트리
  main.jsx             # React Root 및 RouterProvider 정의
```


---


## 23. 바이브 코딩 구현 순서 추천

이 프로젝트는 한 번에 크게 던지면 AI가 자주 흐트러진다. 아래 순서로
나누는 편이 훨씬 잘 나온다.

### 1단계

-   Vite + React + Router + Zustand + SCSS 세팅
-   전역 스타일, 색상 토큰, 반응형 믹스인, `.inner`,
    Header/Footer/Layout 먼저 완성

### 2단계

-   `productData.js`, `boardData.js` Seed Data 만들기
-   `useStore.js` + 각 Slice 생성
-   LocalStorage persist 연동

### 3단계

-   Home / Search Modal / Nav / ProductItem / ProductList 구현
-   `/product`, `/women`, `/men`, `/best`, `/sale` 흐름 연결

### 4단계

-   ProductDetail 구현
-   옵션 선택, 리뷰 CRUD, related swiper, wishlist 연동

### 5단계

-   Cart / Checkout 구현
-   선택 주문 / 전체 주문 / 결제 성공 후 주문 저장까지 연결

### 6단계

-   Login / Signup / FindAccount 구현
-   테스트 회원 플로우 연결

### 7단계

-   MyPage 전체 탭 구현
-   주문 / 위시 / 주소 / Q&A / 1:1 문의 / 내 리뷰 관리 연결

### 8단계

-   Notice / FAQ / Inquiry 마무리
-   SweetAlert 커스텀 / 모바일 UI 보정


---


## 24. AI에 바로 넣기 좋은 바이브 코딩 프롬프트

아래 프롬프트는 실제로 결과물을 비슷하게 만드는 데 도움이 되도록
작성했다.

## 24-1. 전체 프로젝트 시작 프롬프트

``` txt
React 19 + Vite + react-router-dom + Zustand + SCSS로 미니멀 패션 이커머스 프론트엔드 프로젝트를 만들어줘.
브랜드 무드는 Aesop 브랜드의 흑백 모노톤, 넓은 여백, 얇은 보더, uppercase 타이포다.
백엔드는 붙이지 말고, 모든 데이터는 seed data + Zustand + localStorage persist로 처리해.
localStorage persist key는 aesop-storage로 하고, 검색 최근어는 recentSearches로 별도 저장해.
라우트는 /, /about, /product, /women, /men, /gift, /best, /sale, /product/:id, /cart, /checkout, /login, /signup, /find-account, /mypage, /board/notices, /board/faq, /board/inquiry 를 만들어줘.
먼저 전역 스타일 토큰, layout, header, footer, 라우터, store 뼈대부터 만들어줘.
```

## 24-2. 상품 목록/상세 프롬프트

``` txt
상품 목록과 상품 상세를 만들어줘.
목록 페이지는 /product, /women, /men, /best, /sale 경로에 따라 필터가 자동 적용되게 하고,
카테고리 탭은 All, Outer, Top, Knit, Pants, Skirt, Dress 로 구성해.
상품 카드는 세로로 긴 이미지 비율, hover 시 하단 액션 버튼, NEW/SALE 배지, 할인 가격 표시가 있어야 해.
상세 페이지는 좌측 큰 이미지, 우측 sticky 정보 영역, color/size 선택, 수량 변경, add to basket, wishlist 버튼, details/reviews 탭, 리뷰 CRUD, related swiper까지 구현해줘.
리뷰는 로그인 사용자만 작성 가능하고, 본인 리뷰만 수정/삭제 가능하게 해줘.
```

## 24-3. 장바구니/결제 프롬프트

``` txt
장바구니와 결제 페이지를 만들어줘.
장바구니는 product id + selectedColor + selectedSize 조합으로 cartId를 만들고,
전체 선택, 개별 선택, 선택 삭제, 전체 비우기, 수량 변경, 선택 상품 주문하기, 전체 상품 주문하기가 가능해야 해.
결제 페이지는 선택된 cartId만 받아서 주문할 수 있어야 하고,
배송지 입력, react-daum-postcode 주소 검색 모달, 카드/무통장 결제 선택, 주문 요약 사이드바, 결제 완료 후 order 저장과 장바구니 삭제까지 연결해줘.
```

## 24-4. 로그인/회원가입/계정찾기 프롬프트

``` txt
로그인, 회원가입, 아이디/비밀번호 찾기 페이지를 만들어줘.
Zustand authSlice로 users, user, isLoggedIn, error를 관리하고,
로그인 실패 시 에러 문구를 보여줘.
임시 회원 시작 버튼을 만들어서 test@aesop.com / testpassword123 을 자동 입력하고,
계정이 없으면 먼저 스토어에 등록만 해두게 해줘.
회원가입은 이메일 중복 검사와 비밀번호 확인 검사를 넣고,
아이디 찾기는 이름+전화번호, 비밀번호 찾기는 이메일+이름 확인 후 재설정 가능하게 만들어줘.
```

## 24-5. 마이페이지 프롬프트

``` txt
로그인한 사용자 전용 마이페이지를 만들어줘.
비로그인 접근 시 sweetalert로 로그인 필요 안내 후 /login 으로 보내줘.
좌측 사이드바 메뉴와 우측 콘텐츠 구조로 만들고,
주문내역, 관심상품, 적립금, 쿠폰, 회원정보, 배송지관리, Q&A, FAQ, 공지사항, 1:1 문의 탭이 있어야 해.
배송지 관리는 react-daum-postcode 모달과 updateUserAddress를 사용하고,
Q&A와 1:1 문의 작성/수정 폼은 react-quill-new로 만들어줘.
1:1 문의 탭에서는 내가 쓴 상품 리뷰 목록과 내 문의 목록을 함께 관리할 수 있게 해줘.
```

## 24-6. 폴리싱 프롬프트

``` txt
전체 프로젝트를 Aesop 브랜드 무드의 미니멀 UI로 폴리싱해줘.
폰트는 Pretendard, 컬러는 black/white/gray 중심, 컬러 포인트는 최소화하고 자연스러운 베이지/브라운 계열 사용를 사용해.
header는 sticky, mobile menu는 full screen overlay, search modal은 blur overlay,
product grid는 desktop 4열 / tablet 3열 / mobile 2열,
cart summary와 product detail info는 desktop에서 sticky,
sweetalert2 팝업은 각진 모양과 블랙 버튼 스타일로 커스텀해줘.
반응형은 단순 축소가 아니라 모바일에서 구성 자체가 자연스럽게 바뀌어야 해.
```


---


## 25. 정의된 완료 기준 (Definition of Done)

### 25-1. 화면

-   [ ] 헤더가 sticky다.
-   [ ] 태블릿 이하에서 햄버거 메뉴가 전체 화면으로 열린다.
-   [ ] 검색 모달이 전체 화면 오버레이로 뜬다.
-   [ ] 홈 Hero가 풀스크린 비주얼 느낌으로 동작한다.
-   [ ] 상품 카드가 세로형 이미지 카드다.
-   [ ] 상세 페이지가 좌우 2컬럼 + sticky info 구조다.
-   [ ] 장바구니/결제 요약이 우측 sticky 사이드바다.
-   [ ] 마이페이지가 좌측 메뉴 + 우측 패널 구조다.

### 25-2. 기능

-   [ ] 앱 시작 시 상품 Seed Data가 스토어에 들어간다.
-   [ ] 검색어로 상품 검색이 된다.
-   [ ] 최근 검색어가 최대 5개 저장된다.
-   [ ] 찜하기 토글이 된다.
-   [ ] 리뷰 작성/수정/삭제가 된다.
-   [ ] 문의/Q&A 작성/수정/삭제가 된다.
-   [ ] 장바구니에 옵션 조합 기준으로 담긴다.
-   [ ] 선택 주문 / 전체 주문이 된다.
-   [ ] 주문 후 장바구니에서 해당 상품만 제거된다.
-   [ ] 마이페이지에서 내 주문 / 찜 / 리뷰 / 문의를 볼 수 있다.

### 25-3. 영속성

-   [ ] 새로고침 후 로그인 상태가 유지된다.
-   [ ] 새로고침 후 장바구니가 유지된다.
-   [ ] 새로고침 후 위시리스트가 유지된다.
-   [ ] 새로고침 후 주문 내역이 유지된다.
-   [ ] 새로고침 후 내가 쓴 리뷰/Q&A/문의가 유지된다.

### 25-4. 반응형

-   [ ] 모바일에서 Header 높이와 메뉴 구조가 달라진다.
-   [ ] Product Grid가 2열로 줄어든다.
-   [ ] 상세 페이지가 1열로 떨어진다.
-   [ ] Footer가 세로 스택으로 바뀐다.
-   [ ] 장바구니/결제 UI가 모바일에서도 읽기 쉬운 구조다.


---


## 26. 약점과 보완 포인트


### 26-2. 카드 퀵 ADD의 옵션 문제

-   현재 구현은 옵션 없는 cart item이 생길 여지가 있다.
-   권장 보완:
    -   카드에서는 상세 페이지 이동만 허용
    -   또는 기본 옵션을 강제로 지정

### 26-3. 게스트 결제 플로우

-   주문 저장 후 `/mypage` 로 이동하는데 비로그인 사용자는 막힌다.
-   권장 보완:
    -   결제 전 로그인 필수
    -   또는 주문완료 페이지 별도 제공

### 26-4. 회원정보 수정 탭

-   현재는 readOnly + 버튼만 있고 실제 수정 로직이 없다.
-   포트폴리오 완성도를 높이려면 추후 확장 가능

### 26-5. Share 버튼

-   UI만 있고 실제 공유 액션이 없다.
-   `navigator.share` 또는 URL copy로 보완 가능

### 26-6. React Query

-   Provider만 있고 핵심 기능에는 거의 사용하지 않는다.
-   의도적으로 유지할지, 아니면 제거하고 프로젝트를 더 선명하게 만들지
    결정하면 된다.


---


미확정 정책 항목

### 26-7. 주문 상세보기 문의하기 버튼

주문 상세보기 모달에는 `문의하기` 버튼이 존재한다.\
그러나 연결 방식은 아직 최종 확정되지 않았다.

현재 고려 중인 방식

1.  고객지원 문의 작성 페이지로 이동
2.  주문번호가 포함된 문의 작성 화면으로 이동
3.  주문 상세 모달 내부에서 간단 문의 입력

현재 문서에서는 **버튼 UI만 정의하며 실제 연결 정책은 추후 결정한다.**

# 27. 데이터 및 상태 관리 정합 규칙

이 섹션은 실제 구현 시 발생할 수 있는 데이터 모델, 상태 관리, UI 구조 간
불일치를 방지하기 위한 정합 규칙을 정의한다.

## 27-1. 온라인 주문 / 오프라인 주문 구분

주문 데이터는 온라인 구매와 오프라인 구매를 모두 포함할 수 있다.

``` ts
interface Order {
  id: string
  userId: string
  orderType: 'online' | 'offline'
  storeName?: string
  items: CartItem[]
  subtotal: number
  couponDiscount: number
  shippingFee: number
  totalAmount: number
  receiver?: string
  phone?: string
  zipcode?: string
  address?: string
  detailAddress?: string
  samples?: string[]
  createdAt: string
  status:
    | '주문접수'
    | '결제완료'
    | '배송준비중'
    | '배송중'
    | '배송완료'
}
```

온라인 주문 특징

-   배송 정보 존재
-   샘플 선택 가능
-   배송 상태 관리

오프라인 주문 특징

-   매장 구매 기록
-   배송 정보 없음
-   storeName 표시

예시

    오프라인 구매 | Aesop 가로수길 매장


---


## 27-2. Seed Data 구조 규칙

상품 데이터와 리뷰 데이터는 반드시 분리한다.

잘못된 구조

    Product {
      reviews: Review[]
    }

권장 구조

    productData.js
    reviewData.js

Product

``` ts
interface Product {
  id: string
  category: string
  name: string
  volume: string
  price: number
  image: string
  scent: string
  isNew: boolean
  isBest: boolean
  stock: number
}
```

Review

``` ts
interface Review {
  id: string
  productId: string
  user: string
  rating: number
  content: string
  date: string
}
```

장점

-   리뷰 CRUD 구현 단순화
-   Product 데이터 구조 안정화


---


## 27-3. SearchModal 최근 검색어 구조

최근 검색어는 Zustand store가 아닌 LocalStorage에서 직접 관리한다.

이유

-   글로벌 상태 관리가 불필요
-   페이지 새로고침 시 유지 가능

저장 키

    recentSearches

예시 구현

``` ts
const saveRecentSearch = (query) => {
  const searches = JSON.parse(localStorage.getItem("recentSearches") || "[]")
  const updated = [query, ...searches.filter(v => v !== query)].slice(0,5)
  localStorage.setItem("recentSearches", JSON.stringify(updated))
}
```

규칙

-   중복 제거
-   최신순 정렬
-   최대 5개 유지


---


## 27-4. Wishlist 상태 구조

위시리스트 데이터는 사용자별로 관리되어야 한다.

``` ts
interface WishlistItem {
  id: string
  userId: string
  productId: string
}
```

Zustand 상태

    wishlist: WishlistItem[]

핵심 동작

    toggleWishlist(userId, productId)

동작 규칙

-   이미 존재하면 삭제
-   없으면 추가


---


## 27-5. Product / ProductDetail / CartItem / OrderItem 연결 구조

네 모델의 식별자와 참조 관계는 동일한 기준을 사용해야 한다.

Product

    id: productId

ProductDetail

    productId → Product.id 참조

CartItem

    productId → Product.id 참조
    cartId → productId + option 조합

OrderItem

    productId → Product.id 참조
    cartId → 주문 시점의 cartId 스냅샷

예시

    productId = "handwash_01"
    cartId = "handwash_01-75ml"

연결 규칙

-   `Product.id` 는 상품의 기준 ID이다.
-   `ProductDetail.productId` 는 반드시 `Product.id` 를 참조한다.
-   `Review.productId` 도 반드시 동일한 `Product.id` 를 참조한다.
-   `CartItem.productId` 는 `Product.id` 를 참조한다.
-   `CartItem.cartId` 는 `productId-volume` 조합으로 생성한다.
-   `OrderItem.productId` 는 주문 시점의 `Product.id` 를 그대로
    저장한다.
-   `OrderItem.cartId` 는 주문 시점 장바구니 항목의 `cartId` 를
    스냅샷으로 저장한다.

예시 흐름

``` txt
Product.id = handcream_01
ProductDetail.productId = handcream_01
Review.productId = handcream_01
CartItem.productId = handcream_01
CartItem.cartId = handcream_01-75ml
OrderItem.productId = handcream_01
OrderItem.cartId = handcream_01-75ml
```

이 규칙을 유지해야 상품 상세, 리뷰, 장바구니, 주문 상세가 모두
안정적으로 연결된다.


---



---


## 28-4. 주문 대상 규칙

이 프로젝트에서는 **선택 주문 기능을 사용하지 않는다.**\
주문 대상은 항상 현재 장바구니에 담긴 전체 상품이다.

규칙

-   주문 대상은 `cartItems` 전체이다.
-   결제정보입력 단계에서는 장바구니 전체 상품을 기준으로 주문 요약을
    표시한다.
-   주문 완료 시 장바구니 전체를 비운다.

주문 흐름

    cartItems 전체
    → 결제정보입력
    → Order 생성
    → Order 저장
    → clearCart()
    → 주문완료

## 28-5. Checkout Step 이동 규칙

Checkout은 하나의 페이지에서 **Step UI**로 진행된다.

Step 구성

1.  장바구니\
2.  결제정보입력\
3.  주문완료

Step 이동 규칙

-   Step UI는 진행 상태를 표시한다.
-   사용자는 **이전 단계로만 이동할 수 있다.**
-   아직 도달하지 않은 다음 단계로의 이동은 허용하지 않는다.
-   주문완료 단계에서는 Step UI를 통한 이동을 허용하지 않는다.

동작 예

cart 단계

-   현재 Step: cart
-   payment / complete 클릭 불가

payment 단계

-   cart 클릭 가능 (장바구니로 돌아가기)
-   complete 클릭 불가

complete 단계

-   Step UI 전체 비활성
-   단계 이동 불가

## 28-6. 주문 데이터 생성 규칙

결제 완료 시 주문 데이터는 현재 장바구니 항목을 기준으로 생성한다.

Order 생성 과정

    cartItems
    → OrderItem 변환
    → Order 생성
    → Order 저장

주문 데이터는 장바구니 데이터를 그대로 참조하지 않고 **스냅샷 형태로
저장한다.**

이 규칙을 통해

-   이후 상품 가격 변경
-   상품 정보 변경

이 발생해도 **과거 주문 기록은 유지된다.**

## 28-7. 장바구니 정리 규칙

주문 저장이 완료된 후 장바구니를 정리한다.

순서

    Order 저장
    → clearCart()

주의

장바구니를 먼저 비우면 주문 생성에 필요한 데이터가 사라질 수 있으므로\
**반드시 주문 저장 이후에 clearCart()를 실행한다.**

## 28-8. 주문 완료 화면 표시 규칙

주문 완료 화면은 장바구니 데이터를 기준으로 렌더링하지 않는다.

이유

주문 완료 시 장바구니가 비워질 수 있기 때문이다.

표시 기준

    completedOrderId

예

    const order = getOrderById(completedOrderId)

이 규칙을 통해 주문 완료 화면에서 항상 정확한 주문 정보를 표시할 수
있다.

## 28-9. Checkout 상태 관리

Checkout Step 상태는 Zustand `checkoutStore`에서 관리한다.

관리 상태

-   `currentStep` : 현재 Checkout 단계 (`cart` \| `payment` \|
    `complete`)
-   `completedOrderId` : 주문 완료 후 생성된 주문 ID

예시 구조

``` ts
type CheckoutStep = "cart" | "payment" | "complete"

interface CheckoutState {
  currentStep: CheckoutStep
  completedOrderId: string | null

  setStep: (step: CheckoutStep) => void
  setCompletedOrder: (orderId: string) => void
  resetCheckout: () => void
}
```

초기 상태

    currentStep = "cart"
    completedOrderId = null

주문 완료 처리

    Order 생성
    → Order 저장
    → completedOrderId 저장
    → currentStep = "complete"

주문 완료 화면은 장바구니 데이터를 사용하지 않고 `completedOrderId`
기준으로 주문 정보를 조회한다.

예

``` ts
const order = getOrderById(completedOrderId)
```

Checkout 페이지를 벗어나거나 새로운 주문을 시작할 경우 checkout 상태를
초기화한다.

    resetCheckout()

동작

    currentStep = "cart"
    completedOrderId = null

# 29. 최종 정리

이 프로젝트를 잘 재현하려면 아래 순서를 기억하면 된다.

1.  **브랜드 무드**를 먼저 맞춘다.\
    검정/흰색/회색, 큰 여백, 얇은 선, 절제된 타이포가 먼저다.

2.  **레이아웃과 흐름**을 맞춘다.\
    Header → Search → Product List → Detail → Cart → Checkout → MyPage
    흐름이 자연스럽게 이어져야 한다.

3.  **상태와 영속성**을 맞춘다.\
    이 프로젝트의 강점은 예쁜 UI보다도, 상태가 새로고침 후에도 유지되는
    실제 상호작용에 있다.

4.  **반응형과 디테일**로 마무리한다.\
    모바일 메뉴, sticky 영역, hover, toast, alert, review edit mode 같은
    요소가 결과물의 완성도를 크게 올린다.
