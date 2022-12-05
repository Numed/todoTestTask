import styled from "styled-components";
import close from "../../image/close.png";

export const PopUp = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(47, 47, 47, 0.5);
  &.show {
    display: block;
  }
`;

export const PopUpInner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
`;

export const PopUpForm = styled.div`
  position: relative;
  width: 50%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #1d3557;
  padding: 20px;
`;

export const ButtonClose = styled.button`
  width: 32px;
  height: 32px;
  background: url(${close}) no-repeat center;
  position: absolute;
  top: 20px;
  right: 20px;
  transform: scale(0.5);
  filter: invert(1);
  cursor: pointer;
  border: none;
`;

export const PopUpTitle = styled.h3`
  font-size: 22px;
  color: #fff;
  letter-spacing: 1.2px;
  font-weight: 500;
`;

export const InputSection = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  &:not(:first-child) {
    margin-top: 25px;
  }
`;

export const LabelInput = styled.label`
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1.1px;
  color: #fff;
  margin-bottom: 5px;
`;

export const InputText = styled.input`
  padding: 4px 20px;
  outline: none;
  border: none;
  color: #fff;
  font-size: 14px;
  letter-spacing: 1.2px;
  background: #457b9d;
`;

export const SaveButton = styled.button`
  padding: 4px 25px;
  background-color: #457b9d;
  color: #f1faee;
  text-align: center;
  letter-spacing: 1.1px;
  cursor: pointer;
  margin-top: 25px;
  &:hover {
    color: #fff;
    transition: color 0.15s linear;
  }
  border: none;
`;
