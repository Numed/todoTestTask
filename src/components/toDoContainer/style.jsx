import styled from "styled-components";
import editImg from "../../image/edit.png";
import deleteImg from "../../image/delete.png";

export const SectionTitle = styled.h2`
  text-align: center;
  font-size: 28px;
  letter-spacing: 1.2px;
  margin-bottom: 25px;
  line-height: 32px;
  background: #a8dadc;
  color: #fff;
  padding: 10px;
`;

export const SectionInner = styled.div`
  width: 33.3%;
  height: 100%;
  display: flex;
  margin: 40px auto 0;
  background-color: #457b9d;
  justify-content: center;
  align-items: center;
  padding: 20px;
  flex-direction: column;
`;

export const ToDoInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  border-bottom: 2px solid #f1faee;
`;

export const Ul = styled.ul`
  list-style: none;
`;

export const Label = styled.label`
  margin-left: 10px;
  display: flex;
  align-items: center;
  color: #222;
  width: 80%;

  li {
    margin-left: 10px;
    color: #fff;
    font-size: 14px;
    letter-spacing: 1.2px;
    line-height: 28px;
  }
`;

export const ButtonContainer = styled.div`
  width: auto;
  height: 100%;
`;

export const EditButton = styled.button`
  color: #fff;
  border: none;
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-right: 5px;
  background: #a8dadc url(${editImg}) no-repeat center;
  background-size: auto;
`;

export const RemoveButton = styled.button`
  color: #fff;
  border: none;
  width: 24px;
  height: 24px;
  cursor: pointer;
  background: #e63946 url(${deleteImg}) no-repeat center;
  background-size: auto;
`;

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InputAdd = styled.input`
  padding: 4px 12px;
  background: transparent;
  font-size: 16px;
  letter-spacing: 1.2px;
  color: #f1faee;
  border: 1px solid #f1faee;

  &:focus {
    outline: #a8dadc;
  }

  &::placeholder {
    color: #f1faee;
    opacity: 1;
  }
`;

export const AddButton = styled.button`
  background: #a8dadc;
  color: #f1faee;
  padding: 7px 12px;
  border: none;
  cursor: pointer;
`;
