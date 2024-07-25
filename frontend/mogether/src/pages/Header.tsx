import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const HeaderContainer = styled.header`
  top: 0;
  width: 100%;
  height: 60px; /* 고정된 헤더 높이 */
  background-color: transparent;
  color: #000000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // padding: 0 20px;
  box-shadow: none;
  border-bottom: 2px solid #7848f4;
  z-index: 1000;
  margin-bottom: 30px;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none; /* 작은 화면에서는 기본 네비게이션 숨김 */
  }
`;

const NavLink = styled(Link)`
  margin: 0 15px;
  color: #000000;
  text-decoration: none;
  font-size: 18px;
  position: relative;

  &:hover {
    color: #7848f4;
  }

  &::after {
    content: "";
    display: block;
    width: 0;
    height: 2px;
    background: #7848f4;
    transition: width 0.3s;
    position: absolute;
    bottom: -5px;
    left: 0;
  }

  &:hover::after {
    width: 100%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none; /* 작은 화면에서는 버튼 숨김 */
  }
`;

const Button = styled.button`
  background-color: #ffffff;
  color: #7848f4;
  border: 1px solid #7848f4;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  margin: 10px;

  &:hover {
    background-color: #7848f4;
    color: #ffffff;
  }
`;

const DropdownButton = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuIcon = styled.div`
  display: none;
  cursor: pointer;
  font-size: 24px;
  margin: 0 10px;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 768px) {
    display: block; /* 작은 화면에서는 메뉴 아이콘 표시 */
  }

  &.open {
    transform: rotate(90deg);
  }
`;

const slideDown = keyframes`
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 500px;
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    max-height: 500px;
    opacity: 1;
  }
  to {
    max-height: 0;
    opacity: 0;
  }
`;

const DropdownMenu = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: absolute;
  top: 60px;
  left: 0;
  margin-left: 10px;
  width: 35%;
  background-color: #fff;
  border: 2px solid #000000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 999;
  max-height: ${({ isOpen }) => (isOpen ? "500px" : "0")};
  overflow: hidden;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  animation: ${({ isOpen }) => (isOpen ? slideDown : slideUp)} 0.5s ease-in-out;

  a {
    display: block;
    padding: 10px 20px;
    color: #000;
    text-decoration: none;
    font-size: 18px;

    &:hover {
      background-color: #f0f0f0;
      color: #7848f4;
    }
  }
`;

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  return (
    <HeaderContainer>
      <MenuIcon className={isOpen ? "open" : ""} onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </MenuIcon>
      <Nav>
        <NavLink to="/group">소모임</NavLink>
        <NavLink to="/bungae">번개</NavLink>
        <NavLink to="/study">스터디</NavLink>
        <NavLink to="/mypage">마이페이지</NavLink>
      </Nav>
      <ButtonContainer>
        <Button onClick={() => handleNavigation("/login")}>Login</Button>
        <Button onClick={() => handleNavigation("/register")}>Register</Button>
      </ButtonContainer>
      <DropdownMenu isOpen={isOpen}>
        <NavLink to="/group" onClick={toggleMenu}>
          소모임
        </NavLink>
        <NavLink to="/bungae" onClick={toggleMenu}>
          번개
        </NavLink>
        <NavLink to="/study" onClick={toggleMenu}>
          스터디
        </NavLink>
        <NavLink to="/mypage" onClick={toggleMenu}>
          마이페이지
        </NavLink>
        <DropdownButton>
          <Button onClick={() => handleNavigation("/login")}>Login</Button>
          <Button onClick={() => handleNavigation("/register")}>
            Register
          </Button>
        </DropdownButton>
      </DropdownMenu>
    </HeaderContainer>
  );
};

export default Header;