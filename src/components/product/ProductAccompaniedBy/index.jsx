import { Link } from 'react-router-dom';

function ProductAccompaniedBy({ products }) {
    if (!products.length) {
        return null;
    }

    return (
        <section className="product-accompanied">
            <div className="inner">
                <h2 className="product-accompanied__title">Accompanied By</h2>

                <div className="product-accompanied__grid">
                    {products.slice(0, 3).map((product) => (
                        <Link
                            to={`/product/${product.id}`}
                            className="product-accompanied__item"
                            key={product.id}
                        >
                            <div className="product-accompanied__image">
                                <img src={product.image} alt={product.name} />
                            </div>
                            <div className="product-accompanied__info">
                                <h3>{product.name}</h3>
                                <p>{product.price.toLocaleString()}원</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ProductAccompaniedBy;
