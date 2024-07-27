import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addToCart,
    cartSelector,
    getCartItems,
    removeCartItem,
} from "../product/cartSlice";
import {
    Button,
    Card,
    Col,
    Form,
    Image,
    ListGroup,
    ListGroupItem,
    Row,
} from "react-bootstrap";
import Message from "../components/Message";
import { Link } from "react-router-dom";

const CartScreen = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(cartSelector);

    useEffect(() => {
        (async () => {
            dispatch(getCartItems());
        })();
    }, []);

    return (
        <>
            <Row>
                <Col md={8}>
                    <h1>Shopping Cart </h1>
                    {cartItems.length === 0 ? (
                        <Message variant="info">
                            Your cart is empty <Link to="/">Go Back</Link>
                        </Message>
                    ) : (
                        <ListGroup variant="flush">
                            {cartItems.map((product) => (
                                <ListGroup.Item key={product._id}>
                                    <Row>
                                        <Col md={2}>
                                            <Image
                                                src={product?.image}
                                                alt={product?.name}
                                                fluid
                                                rounded
                                            />
                                        </Col>
                                        <Col md={3}>
                                            <Link
                                                to={`/product/${product._id}`}
                                            >
                                                {product.name}
                                            </Link>
                                        </Col>
                                        <Col md={2}>${product.price}</Col>

                                        <Col md={3}>
                                            <Form.Select
                                                value={product.quantity}
                                                onChange={(e) =>
                                                    dispatch(
                                                        addToCart({
                                                            ...product,
                                                            quantity: Number(
                                                                e.target.value
                                                            ),
                                                        })
                                                    )
                                                }
                                            >
                                                {[
                                                    ...Array(
                                                        product?.countInStock
                                                    ).keys(),
                                                ].map((x) => (
                                                    <option
                                                        value={x + 1}
                                                        key={x + 1}
                                                    >
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Col>

                                        <Col md={1}>
                                            <Button
                                                type="button"
                                                variant="light"
                                                onClick={() =>
                                                    dispatch(
                                                        removeCartItem(
                                                            product._id
                                                        )
                                                    )
                                                }
                                            >
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
                <Col md={4}>
                    <ListGroup variant="flush">
                        <Card>
                            <ListGroup.Item>
                                <h2>
                                    Subtotal (
                                    {cartItems.reduce(
                                        (acc, item) => acc + item.quantity,
                                        0
                                    )}
                                    ) items
                                </h2>
                                $
                                {cartItems
                                    .reduce(
                                        (acc, item) =>
                                            acc + item.quantity * item.price,
                                        0
                                    )
                                    .toFixed(2)}
                            </ListGroup.Item>
                        </Card>
                    </ListGroup>
                </Col>
            </Row>
        </>
    );
};

export default CartScreen;
