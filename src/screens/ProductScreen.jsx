/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    Row,
    Col,
    Image,
    ListGroup,
    Button,
    Card,
    Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../product/productActions";
import { productDetailsSelector } from "../product/productDetailsSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../product/cartSlice";

function ProductScreen() {
    let { id } = useParams();
    const dispatch = useDispatch();
    const { isLoading, data, isError } = useSelector(productDetailsSelector);
    const [qty, setQty] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            dispatch(getProduct(id));
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const addToCardHandler = () => {
        console.log("Add to card handler", id);
        console.log(data);
        dispatch(addToCart({ ...data, quantity: qty }));
        navigate(`/cart/${id}?qty=${qty}`);
        // navigate(`/cart`);
    };

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : isError ? (
                <>
                    <Message variant="danger">{isError}</Message>
                </>
            ) : (
                <div>
                    <Link to="/" className="btn btn-light my-3">
                        Go Back
                    </Link>
                    <Row>
                        <Col md={6}>
                            <Image src={data?.image} alt={data?.name} fluid />
                        </Col>
                        <Col md={3}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>{data?.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating
                                        value={data?.rating}
                                        text={`${data?.numReviews} reviews`}
                                        color={"#f8e825"}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price: ${data?.price}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Description: {data?.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>
                                                <strong>${data?.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                {data?.countInStock > 0
                                                    ? "In Stock"
                                                    : "Out Of Stock"}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {data?.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col xs="auto" className="my-1">
                                                    <Form.Select
                                                        value={qty}
                                                        onChange={(e) =>
                                                            setQty(
                                                                parseInt(
                                                                    e.target
                                                                        .value
                                                                )
                                                            )
                                                        }
                                                    >
                                                        {[
                                                            ...Array(
                                                                data?.countInStock
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
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item>
                                        <Button
                                            onClick={addToCardHandler}
                                            className="btn-block"
                                            type="button"
                                            disabled={data?.countInStock === 0}
                                        >
                                            Add To Cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </div>
            )}
            {/* {!loading && (
                <div>
                    <Link to="/" className="btn btn-light my-3">
                        Go Back
                    </Link>
                    <Row>
                        <Col md={6}>
                            <Image
                                src={product.image}
                                alt={product.name}
                                fluid
                            />
                        </Col>
                        <Col md={3}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating
                                        value={product.rating}
                                        text={`${product.numReviews} reviews`}
                                        color={"#f8e825"}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price: ${product.price}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Description: {product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>
                                                <strong>
                                                    ${product.price}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                {product.countInStock > 0
                                                    ? "In Stock"
                                                    : "Out Of Stock"}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Button
                                            className="btn-block"
                                            type="button"
                                            disabled={
                                                product.countInStock === 0
                                            }
                                        >
                                            Add To Cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </div>
            )} */}
        </>
    );
}

export default ProductScreen;
