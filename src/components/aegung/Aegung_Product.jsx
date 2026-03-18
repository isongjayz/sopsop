import Aegung_Banner from "./Aegung_Banner";
import Aegung_Product_Card from "./Aegung_Product_Card";

const Aegung_Product = () => {

    return (
        <section className="product">
            <Aegung_Banner />
            <div className="inner">
                <Aegung_Product_Card />

            </div>
        </section>
    );
};

export default Aegung_Product;