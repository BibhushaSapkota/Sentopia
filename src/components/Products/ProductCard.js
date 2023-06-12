import '../TopProducts/TopProducts.css'
import { useNavigate } from 'react-router-dom';
const ProductCard=({product})=>{
    const navigate=useNavigate();
    const handleClick = () => {
        if (localStorage.getItem('token')) {
            navigate(`/products/${product._id}`)          
        }
        else {
            navigate('/login')
        }
    }
    return (
        <div className="product-card" onClick={handleClick}>
            <img src={"http://localhost:3000" + product.image} alt="product" />
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category.categoryName}</p>
        </div>

        )

}
export default ProductCard;

