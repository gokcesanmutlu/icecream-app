const Card = ({ item, setBasket, basket }) => {
    // karttaki üründen sepette kaç tane var bulma
    const found = basket.filter(i => i.name === item.name)
    const amount = found.length;

    // silinecek elemanın ismindeki bütün ürünleri sepetten kaldırır.
    const handleReset = () => {
        setBasket(basket.filter((i) => i.name != item.name))
    }

    return (
        <div
            style={{ width: "190px" }}
            className="d-flex flex-column align-items-center gap-1 border rounded p-3"
        >
            <img height={100} src={item.imagePath} alt="çeşit-resim" />
            <span className="fs-5">{item.name}</span>

            <div className="d-flex gap-2 mt-4 align-items-center">
                <button
                    onClick={handleReset}
                    className="btn btn-sm btn-outline-danger">
                    Reset
                </button>
                <span className="fs-2">{amount}</span>
                <button
                    onClick={() => setBasket([...basket, item])}
                    className="btn btn-sm btn-outline-success">
                    Add
                </button>
            </div>
        </div>
    );
};

export default Card;
