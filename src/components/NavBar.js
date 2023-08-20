import { AppBar, Toolbar, Typography, styled, Box, Badge, Dialog, TextField, Button, Snackbar, Alert } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { sendUserNumber, requestLoginOtp } from '../services/api';

const logoURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png';
const subURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png';

const Component = styled(AppBar)`
    color: #2874f0;
`;

const FlipkartLogo = styled('img')`
    width: 75px;
`;

const Explore = styled(Typography)`
    color: white;
    font-style: italic;
    margin-right: 5px;
    font-size: 12px;
`;

const Plus = styled(Typography)`
    color: yellow;
    font-style: italic;
    font-size: 12px;
`;

const PlusLogo = styled('img')`
    width: 10px;
`;

const Logo = styled(Box)`
    margin-left: 150px;
    line-height: 0;
    cursor: pointer;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
        color: white;
    }
`;

const SearchContainer = styled(Box)`
    border: 1px solid white;
    display: flex;
    margin-left: 20px;
    width: 450px;
    height: 40px;
    background: white;
`;

const SearchInput = styled(Box)`
    width: 400px;
    height: 95%;

    & > input {
        width: 98%;
        height: 88%;
        border: none;
        outline: none;
        padding-left: 10px;
    }
`;

const StyledSearchIcon = styled(Box)`
    margin-left: 20px;
    padding-top: 8px;
    cursor: pointer;
`;

const Login = styled(Box)`
    border: 1px solid white;
    width: 130px;
    height: 30px;
    margin-left: 20px;
    background: white;
    color: #2874f0;
    cursor: pointer;

    &>p {
        font-size: 18px;
        margin-left: 40px;
    }
`;

const MyAccount = styled(Box)`
    width: 150px;
    margin-left: 20px;
    color: white;
    cursor: pointer;

    &>a {
        font-size: 15px;
        margin-left: 20px;
        text-decoration: none;
        color: white;
    }
`

const Seller = styled(Box)`
    margin-left: 30px;
    color: white;
    cursor: pointer;
    font-size: 18px;
`;

const Cart = styled(Box)`
    display: flex;
    margin-left: 30px;
    color: white;
    cursor: pointer;
    text-decoration: none;

    & > p {
        margin-left: 8px;
    }
`;

const LoginContainer = styled(Box)`
    width: 91vh;
    height: 85vh;
    display: flex;
`;

const LeftContainer = styled(Box)`
//   border: 1px solid gray;
  width: 250px;
  background: #2874f0 url('https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png') center 85% no-repeat;

  & > h4 {
    color: white;
    margin-left: 30px;
    margin-top: 100px;
  }

  & > p {
    color: #DBDBDB;
    margin-top: 20px;
    font-size: 18px;
    margin-left: 25px;
  }
`;

const RightContainer = styled(Box)`
  border: 1px solid gray;
  width: 350px;

  & > button {
    margin-left: 20px;
    margin-top: 20px;
    width: 300px;
    height: 50px;
    text-transform: none;
    background: orangered;

    &:hover {
        background: orangered;
    }
  }
`;

const Policy = styled(Typography)`
  margin-left: 20px;
  margin-top: 40px;
  font-size: 12px;
`;

const LoginInput = styled(TextField)`
  width: 300px;
  margin-left: 20px;
  margin-top: 50px;
`;

const NewToFlipkart = styled(Typography)`
  margin-left: 50px;
  margin-top: 250px;
  font-size: 15px;
  cursor: pointer;
  color: #2874f0;
`;

const defaultValue = {
    mobile: '',
}

const defaultOTP = {
    otp: '',
}

const defaultLoginValue = {
    inputValue: '',
}

const NavBar = () => {

    const [login, setLogin] = useState(false);
    const [signUp, setSignUp] = useState(false);
    const [userSignup, setUserSignup] = useState(defaultValue);
    const [optField, setOtpField] = useState(false);
    const [popup, setPopup] = useState(false);
    const [showContinueButton, setShowContinueButton] = useState(true);
    const [showSignupButton, setShowSignupButton] = useState(false);
    const [otp, verifyOtp] = useState([]);
    const [enterOtp, setEnterOtp] = useState(defaultOTP);
    const [verifyOtpPopup, setVerifyOtpPopup] = useState(false);
    const [wrongOtpPopup, setWrongOtpPopup] = useState(false);
    const [loginButton, setLoginButton] = useState(true);
    const [myAccount, setMyAccount] = useState(false);
    const [userLogin, setUserLogin] = useState(defaultLoginValue);
    const [loginText, setLoginText] = useState(true);
    const [loginOtpText, setLoginOtpText] = useState(false);
    const [phoneEmailAlert, setPhoneEmailAlert] = useState(false);
    const [inputValueAlert, setInputValueAlert] = useState('');
    const [signUpPopup, setSignUpPopup] = useState('');

    const handleClose = () => {
        setLogin(false);
        setLoginText(true);
        setLoginOtpText(false);
    }

    const handlePopupClose = () => {
        setPopup(false);
    }

    const handleSignUp = () => {
        setSignUp(false);
    }

    const openLoginForm = () => {
        setLogin(true);
    }

    const openSignUp = () => {
        setSignUp(true);
        setLogin(false);
    }

    const closeSignUp = () => {
        setSignUp(false);
        setLogin(true);
        setShowSignupButton(false);
        setShowContinueButton(true);
        setOtpField(false);
    }

    const onValueChange = (e) => {
        setUserSignup({ ...userSignup, [e.target.name]: e.target.value });
        console.log('My User=', userSignup);
    }

    const sendNumber = async () => {
        let response = await sendUserNumber(userSignup);
        if (response.status === 201) {
            console.log(response);
            verifyOtp(response.data.OTP);
            setSignUpPopup(`Verification Code Sent To ${userSignup.mobile}`);
        } else {
            setOtpField(false);
            setShowSignupButton(false);
            setShowContinueButton(true);
            setSignUpPopup(response.data.msg);
        }
    }

    const newSignUp = async () => {
        console.log('My OTP=', otp);
        console.log('Backend OTP=', otp, 'Front OTP=', enterOtp);
        if (otp === enterOtp.otp) {
            setVerifyOtpPopup(true);
            setWrongOtpPopup(false);
            setLoginButton(false);
            setMyAccount(true);
            setSignUp(false);
        } else {
            setWrongOtpPopup(true);
        }
    }

    const onOtpChange = (e) => {
        setEnterOtp({ ...enterOtp, [e.target.name]: e.target.value });
    }

    const handleVerifyOtpPopupClose = () => {
        setVerifyOtpPopup(false);
    }

    const handleWrongVerifyOtpPopupClose = () => {
        setWrongOtpPopup(false);
    }

    const onLoginValueChange = (e) => {
        setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
        console.log('My User Login=', userLogin);
    }

    const checkInputType = (input) => {
      const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      const phonePattern = /^\d{10}$/;

      if (emailPattern.test(input)) {
        return "email";
        // Perform email-related logic
      } else if (phonePattern.test(input)) {
        return "phone";
        // Perform phone number-related logic
      } else {
        return "invalid";
        // Handle invalid input
      }
    };

    const requestOtp = async () => {
        await requestLoginOtp(userLogin);
        if (checkInputType(userLogin.inputValue) === 'phone') {
            setInputValueAlert(`your Mobile Number ${userLogin.inputValue}`);
        } else if (checkInputType(userLogin.inputValue) === 'email') {
            setInputValueAlert(`your Email Address ${userLogin.inputValue}`);
        }
    }
    const handlePhoneEmailPopupClose = () => {
        setPhoneEmailAlert(false);
    }

    return (
        <>
            <Component>
                <Toolbar>
                    <Logo title='FlipKart' component={Link} to='/'>
                        <FlipkartLogo src={logoURL} alt='flipkartLogo' />
                        <Box>
                            <Explore variant='p'>Explore</Explore>
                            <Plus variant='span'>Plus</Plus>
                            <PlusLogo src={subURL} alt='plusLogo' />
                        </Box>
                    </Logo>
                    <SearchContainer>
                        <SearchInput>
                            <input type='text' name='search' id='search' placeholder='Search for products, brands and more' title='Search for products, brands and more' />
                        </SearchInput>
                        <StyledSearchIcon title='Search'>
                            <SearchIcon />
                        </StyledSearchIcon>
                    </SearchContainer>
                    {
                        loginButton && (
                            <Login title='Login' onClick={ () => openLoginForm()}>
                                <Typography>Login</Typography>
                            </Login>
                        )
                    }
                    {
                        myAccount && (
                            <MyAccount>
                                <Typography component={Link} to='/myAccount'>My Account</Typography>
                            </MyAccount>
                        )
                    }
                    <Seller>
                        <Typography>Become a Seller</Typography>
                    </Seller>
                    <Seller>
                        <Typography>More</Typography>
                    </Seller>
                    <Cart title='Cart' component={Link} to='/cart'>
                        <Badge badgeContent={4} color='error'>
                            <ShoppingCartIcon />
                        </Badge>
                        <Typography>Cart</Typography>
                    </Cart>
                </Toolbar>
            </Component>
            {/* Login Dailog */}
            <Dialog onClose={handleClose} open={login}>
                <LoginContainer>
                    <LeftContainer>
                        <Typography variant='h4'>Login</Typography>
                        <Typography>Get access to your Orders, Wishlist and Recommendations</Typography>
                    </LeftContainer>
                    {
                        loginText && (
                            <RightContainer>
                                <LoginInput label='Enter Email/Mobile number' variant='standard' onChange={ (e) => onLoginValueChange(e)} name='inputValue' />
                                <Policy>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</Policy>
                                <Button variant='contained' onClick={() => { requestOtp(); setLoginOtpText(true); setLoginText(false); setPhoneEmailAlert(true); }}>Request OTP</Button>
                                <NewToFlipkart onClick={ () => openSignUp()}>New to Flipkart? Create an account</NewToFlipkart>
                            </RightContainer>
                        )
                    }
                    {
                        loginOtpText && (
                            <RightContainer>
                                <LoginInput label='Enter OTP' variant='standard' onChange={ (e) => onLoginValueChange(e)} name='loginOtp' />
                                <Button variant='contained' style={{background: '#2874f0'}}>Verify</Button>
                            </RightContainer>
                        )
                    }
                    <Snackbar open={phoneEmailAlert} autoHideDuration={6000} onClose={handlePhoneEmailPopupClose}>
                        <Alert onClose={handlePhoneEmailPopupClose} severity="success" sx={{ width: '100%' }}>
                          Verification Code Sent To {inputValueAlert}
                        </Alert>
                    </Snackbar>
                </LoginContainer>
            </Dialog>
            {/* SignUp Dailog */}
            <Dialog onClose={handleSignUp} open={signUp}>
                <LoginContainer>
                    <LeftContainer>
                        <Typography variant='h4'>Looks like you're new here!</Typography>
                        <Typography>Sign up with your mobile number to get started</Typography>
                    </LeftContainer>
                    <RightContainer>
                        <LoginInput label='Enter Mobile number' variant='standard' onChange={(e) => onValueChange(e)} name='mobile' />
                        {optField && (
                            <LoginInput
                                label='Enter OTP'
                                variant='standard'
                                onChange={ (e) => onOtpChange(e)}
                                name='otp'
                            />
                        )}
                        <Policy>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</Policy>
                        {
                            showContinueButton && (
                                <Button variant='contained' onClick={() => { setOtpField(true); setPopup(true); setShowSignupButton(true); setShowContinueButton(false); sendNumber(); } }>CONTINUE</Button>
                            )
                        }
                        {
                            showSignupButton && (
                                <Button variant='contained' onClick={ () => newSignUp()}>Sign Up</Button>
                            )
                        }
                        <Button variant='contained' style={{ background: 'white', color: '#2874f0' }} onClick={() => closeSignUp()}>Existing User? Log in</Button>
                        <Snackbar open={popup} autoHideDuration={6000} onClose={handlePopupClose}>
                          <Alert onClose={handlePopupClose} severity="success" sx={{ width: '100%' }}>
                            {signUpPopup}
                          </Alert>
                        </Snackbar>
                        <Snackbar open={verifyOtpPopup} autoHideDuration={6000} onClose={handleVerifyOtpPopupClose}>
                          <Alert onClose={handleVerifyOtpPopupClose} severity="success" sx={{ width: '100%' }}>
                            OTP Verified Successfully !
                          </Alert>
                        </Snackbar>
                        <Snackbar open={wrongOtpPopup} autoHideDuration={6000} onClose={handleWrongVerifyOtpPopupClose}>
                          <Alert onClose={handleWrongVerifyOtpPopupClose} severity="error" sx={{ width: '100%' }}>
                            Invalid or Wrong OTP !
                          </Alert>
                        </Snackbar>
                    </RightContainer>
                </LoginContainer>
            </Dialog>
        </>
    )
}

export default NavBar;