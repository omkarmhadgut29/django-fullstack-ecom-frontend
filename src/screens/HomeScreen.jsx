import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { getProducts } from "../product/productActions";
import { productSelector } from "../product/productSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

function HomeScreen() {
    const dispatch = useDispatch();
    const { isLoading, data, isError } = useSelector(productSelector);

    useEffect(() => {
        (async () => {
            dispatch(getProducts());
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <div>
            <h1>Latest Products</h1>
            {isLoading ? (
                <Loader />
            ) : isError ? (
                <>
                    <Message variant="danger">{isError}</Message>
                </>
            ) : (
                <Row>
                    {data?.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
}

export default HomeScreen;
