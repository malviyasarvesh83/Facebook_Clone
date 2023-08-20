import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/api';
import { Box, Button, Typography, styled } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import GradeIcon from '@mui/icons-material/Grade';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const ProductContainer = styled(Box)`
    display: flex;
    background: white;
`;

const LeftContainer = styled(Box)`
    // border: 1px solid gray;
    width: 48%;
    height: 550px;
    margin-top: 30px;
    margin-left: 10px;
`;

const ProductImage = styled(Box)`
    border: 1px solid gray;
    width: 450px;
    height: 450px;
    margin-left: 70px;
    background: white;
    box-shadow: 2px 2px 2px gray;

    &>img {
        width: 280px;
        height: 280px;
        margin-top: 50px;
        margin-left: 20px;
    }
`;

const ProductButton = styled(Box)`
    // border: 1px solid gray;
    width: 450px;
    margin-left: 70px;
    margin-top: 10px;
    height: 50px;
`;

const AddCart = styled(Button)`
    width: 50%;
    margin-right: 13px;
    height: 100%;
    background: orange;

    &:hover {
        background: orange;
    }
`;

const BuyNow = styled(Button)`
    width: 47%;
    height: 100%;
    background: orangered;

    &:hover {
        background: orangered;
    }
`;

const RightContainer = styled(Box)`
    border: 1px solid gray;
    width: 50%;
    margin-top: 30px;
`

const ProductDetail = () => {

    const [product, setProduct] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        getProductDetails();
    }, [])

    const getProductDetails = async () => {
        const response = await getProductById(id);
        setProduct(response.data);
    }

    const Price = () => {
        let mrp = product.mrp || "";
        let cost = product.cost || "";
        let mrpComma = mrp.replace(/,/g, "");
        let costComma = cost.replace(/,/g, "");
        let result = parseInt(mrpComma) - parseInt(costComma);
        return result;
    }

    return (
        <ProductContainer>
            <LeftContainer>
                <ProductImage>
                    <img src={product.url} alt={product.shortTitle} />
                </ProductImage>
                <ProductButton>
                    <AddCart variant='contained'><ShoppingCartIcon /> Add To Cart</AddCart>
                    <BuyNow variant='contained'><FlashOnIcon /> Buy Now</BuyNow>
                </ProductButton>
            </LeftContainer>
            <RightContainer>
                <Typography>{product.longTitle}</Typography>
                <Typography>4.3<GradeIcon /> 59,758 Ratings & 5,856 Reviews</Typography>
                <Typography>Extra ₹<Price /> off</Typography>
                <Typography>₹{product.cost} ₹{product.mrp} {product.discount} off</Typography>
                <Typography>Available offers</Typography>
                <Typography><LocalOfferIcon />Bank OfferGet 10% Cashback on Samsung Axis bank Credit CardT&C</Typography>
                <Typography><LocalOfferIcon />Bank Offer10% off on Axis Bank Credit Card and EMI Transactions, up to ₹1000, on orders of ₹5,000 and aboveT&C</Typography>
                <Typography><LocalOfferIcon />Bank Offer5% off on Flipkart Axis Bank Credit Card and EMI Trxns, up to ₹500, on orders of ₹5,000 and aboveT&C</Typography>
                <Typography><LocalOfferIcon />Special PriceGet extra ₹43000 off (price inclusive of cashback/coupon)T&C</Typography>
                <img src='https://rukminim2.flixcart.com/lockin/400/400/images/CCO__PP_2019-07-14.png?q=50' alt='superCoin' />
                <Typography>{product.description}</Typography>
            </RightContainer>
        </ProductContainer>
    )
}

export default ProductDetail;