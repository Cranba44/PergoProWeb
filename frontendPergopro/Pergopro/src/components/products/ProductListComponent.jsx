import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { getAllProduct } from "../../core/services/productsService";
import { loadProducts } from "./ProductActions";
import { useEffect, useState } from "react";
import './ProductListComponent.css'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


const ProductsListComponent = () => {

    const dispatch = useDispatch();
    const products = useSelector((state)=>state.productReducer.products);
    const user = useSelector((state)=> state.userReducer.user)
    const navigate= useNavigate();
    

   
    //const userRole = user.role;
    const goInfo = (idProduct,) => {
        navigate('/info',{
            state: {
                idProduct,
            }
        },
        )
    }
    // const goCreation = () => {
    //     navigate('/creation')
    // }

    const loadProductList = async ()=> {
        const productsAux = await getAllProduct()
        console.log("Productos obtenidos:", productsAux);
        dispatch(
            loadProducts({
                products: productsAux
            })
        )
    }

    useEffect(()=> {
        loadProductList()
        
    },[])

  return (
    <div>
        <div className="productList-header">
            <h3>Nuestros productos montados:</h3>
        </div>
        <div>
            {
                !products ? <div>Cargando productos...</div>
                : (
                    <>
                    
                        {/* {userRole === 'admin' && (<div> <button onClick={goCreation}>Introducir festival</button></div>)} */}
                    
                    
                    <Row xs={1} md={2} lg={4} className="cardProduct-container g-5 p-5">
        {/* //? He importado cardgroup y card desde la libreria de react-bootstrap */}
                        {
                            products.map((p, idx)=> (
                                <Col key={idx}>
                                    <Card >
                                        <Card.Img variant="top" src={p.image} />
                                        <Card.Body>
                                            <Card.Title>{p.name}</Card.Title>
                                            <Card.Text>
                                                {p.category}
                                            </Card.Text>
                                            <Card.Footer>
                                                <small className="text-muted">{p.description}</small>
                                                <button onClick={()=>goInfo(p._id)}>+ Info</button>
                                                
                                                
                                            </Card.Footer>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        }
                        </Row>
                        </>
                )
            }
        </div>
    </div>
  )
}

export default ProductsListComponent