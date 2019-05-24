import styled from 'styled-components'

const Header = styled.section`
    font-size: 45px;
    font-weight: lighter;
    padding-left: 30px;
    border-bottom: 1px solid #e0e0e0;
`;

const LeftPane = styled.section`
    height: calc(100vh - 90px);
    font-weight: lighter;
    padding: 20px;
    box-shadow: 0px 9px 21px #dadada
    background: #fff;
    height: auto;
`;

const Plate = styled.section`
    padding: 20px;
    box-shadow: 0px 9px 21px #dadada;
    width: 97%;
    margin-top: 20px;
    margin-left: 15px;
`;

const Input = styled.input`
    padding: 0.5em;
    margin: 0.5em;
    border-radius: 3px;
    font-size: 15px;
    border: 1px solid #ccc;
    width: 95%;
`;

const Info = styled.textarea`
    padding: 0.5em;
    margin: 0.5em;
    border-radius: 17px;
    font-size: 15px;
    border: 1px solid #f4f4f4;
    width: 95%;
    height: auto;
    resize: none;
`;

const Button = styled.button`
    border: none;
    color: #FFFFFF;
    padding: 15px 32px;
    text-align: center;
    -webkit-transition-duration: 0.4s;
    transition-duration: 0.4s;
    margin: 16px 0 !important;
    text-decoration: none;
    font-size: 16px;
    cursor: pointer;
    height: auto;
    width: 95%;
    background-color: #bad592;
`;

export { Button, Info, Input, Plate, LeftPane, Header }