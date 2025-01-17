import "./App.css";
import "./bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";

function App() {
    return (
        <>
            <Router>
                <Header />
                <main className="py-3">
                    <Container>
                        <Routes>
                            <Route path="/" element={<HomeScreen />} />
                            <Route
                                path="/product/:id"
                                element={<ProductScreen />}
                            />
                            <Route path="/" element={<HomeScreen />} />
                            <Route path="/cart/:id?" element={<CartScreen />} />
                        </Routes>
                    </Container>
                </main>
                <Footer />
            </Router>
        </>
    );
}

export default App;
