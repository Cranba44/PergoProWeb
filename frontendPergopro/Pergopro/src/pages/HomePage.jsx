import ContactComponent from "../components/contactComponent/ContactComponent"
import NavbarComponent from "../components/navbar/NavbarComponent"
import ProductsListComponent from "../components/products/ProductListComponent"
import './Homepage.css'


const HomePage = () => {
  return (

    <div>
      <header>
        <NavbarComponent/>
      </header>
      <main>
        <ProductsListComponent/>
      </main>
      <footer>
        <ContactComponent/>
      </footer>
    </div>
  )
}

export default HomePage