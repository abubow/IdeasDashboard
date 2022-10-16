import styled from "styled-components";
import {motion} from "framer-motion";

const Container = styled.div`
    display: grid;
    place-items: center;
    min-height: 100vh;
    width: 100%;
    background-color: #24262C;
`;
const Crate = styled.div`
    max-width: 80vw;
    min-height: 85vh;
    background-color: #1C1D22;
    border-radius: 12px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    display: flex;
    overflow: hidden;
    flex-direction: row;
    @media (max-width: 768px) {
        flex-direction: column;
        min-height: 70vh;
    }
`;
const Image = styled.img`
    flex: 3;
    max-width: 65%;
    min-height: 100%;
    object-fit: cover;
    @media (max-width: 768px) {
        display: none;
    }
`;
const Form = styled.form`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 2rem;
    @media (max-width: 768px) {
        padding: 0 1rem;
        min-width: 80vw;
    }
`;
const Title = styled.h1`
    font-size: 2.5rem;
    font-weight: 500;
    color: #fff;
    margin-bottom: 1rem;
    min-width: 315px;
    padding: 1rem 0;
    @media (max-width: 768px) {
        min-width: 0;
        padding: 0;
    }
`;
const Input = styled.input`
    outline: none;
    height: 50px;
    min-width: 315px;
    background: #292B31;
    opacity: 0.5;
    box-shadow: inset 0px 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    border: none;
    margin-bottom: 1.5rem;
    padding: 0 1rem;
    ::placeholder {
        font-size: 1rem;
        font-weight: 700;
        font-spacing: 0.1rem;
        color: #fff;
    }
    @media (max-width: 768px) {
        min-width: 100%;
    }   
`;
const Button = styled(motion.button)`
    width: 315px;
    height: 50px;
    border: none;
    background: #292B31;
    border-radius: 10px;
    cursor: pointer;
    opacity: 0.8;
    margin-top: 0.5rem;
    filter: drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.25));
    font-size: 1rem;
    font-weight: 700;
    &:hover {
        opacity: 1;
        background: #292C31;
    }
    @media (max-width: 768px) {
        width: 100%;
    }
`;
const LogIn = () => {
    return (
        <Container>
            <Crate>
                <Form>
                    <Title>Sign In</Title>
                    <Input type="text" placeholder="Username" />
                    <Input type="password" placeholder="Password" />
                    <Button>LOGIN</Button>
                </Form>
                <Image 
                    src="https://i.ibb.co/wJpbGzW/johannes-plenio-fm-Tde1-Fe23-A-unsplash-1.jpg" 
                    alt="johannes-plenio-fm-Tde1-Fe23-A-unsplash-1"
                    loading="lazy"
                />
            </Crate>
        </Container>
    )
}

export default LogIn
