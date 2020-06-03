import React from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";
import { Redirect } from "react-router-dom";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };
  }

  async componentDidMount() {
    const res = await axios.post("http://localhost:3001/api/products", {
      token: sessionStorage.getItem("token")
    });

    if (res.data.message === "No token provided.") {
      sessionStorage.setItem("isLogin", false);
      return <Redirect to='/login' />;
    }

    if (res.data.message === "invalid token!") {
      sessionStorage.setItem("isLogin", false);
      return <Redirect to='/login' />;
    }

    this.setState({
      products: res.data || [],
    });
  }

  render() {
    let { products } = this.state;
    return (
      <div>
        <h2>Home</h2>
        <Container>
          <Row>
            {products.map((product) => (
              <Col md="3" key={product._id}>
                <div className="mb-2">
                  <Card>
                    <CardImg
                      top
                      width="100%"
                      src={`http://localhost:3001/images/${product.imageProduct}`}
                      alt="Card image cap"
                    />
                    <CardBody>
                      <CardTitle>{product.nameProduct}</CardTitle>
                      <CardText>
                        {parseFloat(product.price).toLocaleString()} vnd
                      </CardText>
                      <Button color="danger">Add to cart</Button>
                    </CardBody>
                  </Card>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    );
  }
}
