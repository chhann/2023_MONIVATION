import React from 'react'
import styled from 'styled-components'

const LoginWith = styled.div `
  & p {
    font-family: 'SUITE-Regular';
    color: #8E8E8E;
    font-size: 0.8rem;
    margin-top: 20px;
  }
  & p::after {
    content: "------ ";
  }
  & p::before {
    content: " ------";
  }

  & div {
    position: absolute;
    top: 405px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
  }

  & button {
    display: inline-block;
    border: none;
    background-color: transparent;
    cursor: pointer;
    padding: 0 10px;
  }
  & img {
    width: 30px;
  }

`

export default function SocialBtn({children, ...rest}) {
  return (
    <LoginWith {...rest}>{children}</LoginWith>
  )
}
