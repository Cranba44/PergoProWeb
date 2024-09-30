import  { useEffect} from 'react'
import {  useDispatch, useSelector } from 'react-redux';
import {  useLocation, useNavigate } from 'react-router-dom'
import { getProductById } from '../../core/services/productsService';
import '../products/ProductListComponent.css'
import { loadProduct } from '../products/ProductActions';


const productInfoComponent = () => {
  
  const navigate = useNavigate();
  const {state} = useLocation();
  const {id} = state;
  const product = useSelector((state) => state.productReducer.product);
  const dispatch = useDispatch();

  const load = async () => {
    const productAux = await getProductById(id);
    
    dispatch(
      loadProduct({
        product: productAux,
      })
    );
      console.log("product", product);
      console.log("idProduct", id);
    };

    const volverButtonHandler = () => {
        navigate("/")
      }
      useEffect(() => {
        load()
    }, []);

      return(
        <div>
        <header>  
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/imagenes/Donuts (1).png"  style={{ width: '300px', height: '300px', marginLeft:'50px' }}/>
        <button  style={{backgroundColor: '#F3A848', padding:'5px 8px' }} onClick={volverButtonHandler}>volver</button>
        </div>
      </header> 
      {/* {
      product && (
      <div >
          <p >{product.name}</p>
          <p >{product.category}</p>
          <p >{product.price + "€"}</p>
          <p >{product.description}</p>
          <img src={product.image} width={400} />
      </div>
    )
  } */}
  {!product ? (
        <p>Loading product information...</p>
      ):(
        <div>
          <p>{product.name}</p>
          <p>{product.category}</p>
          <p>{product.price + '€'}</p>
          <p>{product.description}</p>
          <img src={product.image} width={400} alt={product.name} />
        </div>
      )  }
    </div>
      )
}

export default productInfoComponent