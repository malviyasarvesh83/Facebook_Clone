import { navData, bannerData } from "../constants/data";
import { Box, Button, Typography, styled } from '@mui/material';
import { useEffect, useState } from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { getProducts } from '../services/api';
import { Link } from 'react-router-dom';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const responsive1 = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const NavContainer = styled(Box)`
    display: flex;
    align-item: center;
    text-align: center;
    justify-content: space-between;
    background: white;
    padding-left: 80px;
    padding-right: 80px;
    padding-top: 30px;
    padding-bottom: 30px;
    cursor: pointer;

    &>div:hover {
        color: #2874f0;
    }
`;

const ProductImage = styled('img')`
    width: 75px;
`;

const CarouselStyle = styled(Carousel)`
    margin-left: 10px;
    margin-right: 20px;
    margin-top: 10px;
`;

const AdContainer = styled(Box)`
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 20px;
    cursor: pointer;
`;

const AdImage = styled('img')`
    width: 100%;
`;

const ProductContainer = styled(Box)`
    background: white;
    display: flex;
    margin-top: 8px;
    margin-left: 10px;
    margin-right: 20px;
    height: 300px;
    // box-shadow: 5px 5px 5px gray;
`;

const Left = styled(Box)`
    display: flex;
    width: 85%;
    background: #f0f0f0;
`;

const LeftBox = styled(Box)`
  background-image: url("https://rukminim1.flixcart.com/fk-p-flap/278/278/image/0b22f4bdbe5b032a.jpg?q=90");
  background-position: 0px bottom;
  background-repeat: no-repeat;
  width: 20%;
  background-color: white;

  & > p {
    font-size: 30px;
    margin-top: 90px;
    margin-left: 30px;
  }

  & > button {
    margin-left: 50px;
  }
`;

const RightBox = styled(Box)`
  width: 79%;
  background-color: white;
  padding-left: 5px;

  & > a {
    text-decoration: none;
  }
`;

const RightContainer = styled(Box)`
  width: 15%;

  & > img {
    width: 100%;
    height: 100%;
  }
`;

const ProductBox = styled(Box)`
  height: 297px;
  cursor: pointer;

  & > a {
    text-decoration: none;
  }

  & > img {
    max-width: 180px;
    max-height: 110px;
    margin-top: 15px;
    margin-left: 20px;
  }
`;

const ShortTitle = styled(Typography)`
  margin-top: 20px;
  margin-left: 20px;
  color: black;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
`;

const Cost = styled(Typography)`
  margin-top: 20px;
  margin-left: 30px;
  color: green;
  text-decoration: none;
`;

const LongTitle = styled(Typography)`
  margin-top: 20px;
  margin-left: 10px;
  color: gray;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
`;

const ProductCarousel = styled(Carousel)`
  text-decoration: none;

  & > a {
    text-decoration: none;
  }
`;

const AdBox = styled(Box)`
  display: flex;
//   border: 1px solid gray;
  height: 250px;
  margin-left: 10px;
  margin-right: 20px;
  margin-top: 10px;
  background: #f0f0f0;
  cursor: pointer;
`;

const AdLeft1 = styled(Box)`
//   border: 1px solid gray;
  width: 33%;
  margin-right: 10px;
  background: white;

  & > img {
    width: 100%;
    height: 100%;
  }
`;

const AdMiddle = styled(Box)`
//   border: 1px solid gray;
  width: 33%;
  margin-right: 10px;
  background: white;

  & > img {
    width: 100%;
    height: 100%;
  }
`;

const AdRight = styled(Box)`
//   border: 1px solid gray;
  width: 33%;
  background: white;

  & > img {
    width: 100%;
    height: 100%;
  }
`;

const FlipkartGive = styled(Box)`
//   border: 1px solid gray;
  margin-left: 10px;
  margin-right: 20px;
  margin-top: 10px;
  height: 150px;
  background: white;
  cursor: pointer;

  & > img {
    width: 100%;
    height: 100%;
  }
`

const Homepage = () => {

    const [product, setProduct] = useState([]);

    useEffect(() => {
        getAllProducts();
    }, [])

    const getAllProducts = async () => {
        const response = await getProducts();
        setProduct(response.data);
    }

    return (
        <>
            <NavContainer>
                {
                    navData.map((data) => (
                        <Box>
                            <ProductImage src={data.url} alt={data.text} />
                            <Typography>{data.text}</Typography>
                        </Box>
                    ))
                }
            </NavContainer>
            <CarouselStyle
                responsive={responsive}
                swipeable={false}
                draggable={false}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={4000}
                containerClass="carousel-container"
            >
                {
                    bannerData.map((data) => (
                        <img src={data.url} alt={data.id} style={{ width: '100%', height: 280}} />
                    ))
                }
            </CarouselStyle>
            <AdContainer>
                <AdImage src='https://rukminim2.flixcart.com/fk-p-flap/2000/2000/image/f0015fa73d07b3c8.jpg?q=50' alt='ad1' />
            </AdContainer>
            <ProductContainer>
                <Left>
                    <LeftBox>
                        <Typography>Top Offers</Typography>
                        <Button variant='contained'>View All</Button>
                    </LeftBox>
                    <RightBox>
                        <ProductCarousel
                            responsive={responsive1}
                            swipeable={false}
                            draggable={false}
                            containerClass="carousel-container"
                        >
                            {
                                product.map((data) => (
                                    <ProductBox title={`From ₹${data.cost}`} component={Link} to={`/productDetails/${data.id}`} style={{textDecoration: 'none'}}>
                                        <img src={data.url} alt={data.shortTitle} />
                                        <ShortTitle>{data.shortTitle}</ShortTitle>
                                        <Cost>From ₹{data.cost}</Cost>
                                        <LongTitle>{data.longTitle.slice(0,35)+'...'}</LongTitle>
                                    </ProductBox>
                                ))
                            }
                        </ProductCarousel>
                    </RightBox>
                </Left>
                <RightContainer>
                    <img src="https://rukminim2.flixcart.com/fk-p-flap/464/708/image/92660adea5b5c145.png?q=70" alt='ad1' />
                </RightContainer>
            </ProductContainer>
            <AdBox>
                <AdLeft1>
                    <img src='https://rukminim2.flixcart.com/fk-p-flap/480/480/image/d9f629cced0a451d.jpg?q=50' alt='ad1' />
                </AdLeft1>
                <AdMiddle>
                    <img src='https://rukminim2.flixcart.com/fk-p-flap/480/480/image/0e2442f1a34ac836.jpeg?q=50' alt='ad2' />
                </AdMiddle>
                <AdRight>
                    <img src='https://rukminim2.flixcart.com/fk-p-flap/480/480/image/df072b1963b13fdf.jpeg?q=50' alt='ad3' />
                </AdRight>
            </AdBox>
            <FlipkartGive>
                <img src='https://rukminim2.flixcart.com/fk-p-flap/2000/2000/image/f3eb10134df17580.jpg?q=50' alt='flipkartGive' />
            </FlipkartGive>
            <ProductContainer>
                <Left>
                    <LeftBox>
                        <Typography>Top Offers</Typography>
                        <Button variant='contained'>View All</Button>
                    </LeftBox>
                    <RightBox>
                        <ProductCarousel
                            responsive={responsive1}
                            swipeable={false}
                            draggable={false}
                            containerClass="carousel-container"
                        >
                            {
                                product.map((data) => (
                                    <ProductBox title={`From ₹${data.cost}`} component={Link} to={`/productDetails/${data.id}`} style={{textDecoration: 'none'}}>
                                        <img src={data.url} alt={data.shortTitle} />
                                        <ShortTitle>{data.shortTitle}</ShortTitle>
                                        <Cost>From ₹{data.cost}</Cost>
                                        <LongTitle>{data.longTitle.slice(0,35)+'...'}</LongTitle>
                                    </ProductBox>
                                ))
                            }
                        </ProductCarousel>
                    </RightBox>
                </Left>
                <RightContainer>
                    <img src="https://rukminim2.flixcart.com/fk-p-flap/464/708/image/92660adea5b5c145.png?q=70" alt='ad1' />
                </RightContainer>
            </ProductContainer>
            <Typography>Hello Sarvesh</Typography>
        </>
    )
}

export default Homepage;