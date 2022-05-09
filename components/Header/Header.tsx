import React, { useState } from "react";
import Link from "next/link";
import { Container, Search, Tab, Input, SearchIcon, MenuIcon } from "./HeaderStyled";
import { useMoralis } from "react-moralis";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { authenticate } = useMoralis();

  return (
    <Container isOpen={isMenuOpen}>
      <MenuIcon onClick={() => setIsMenuOpen(!isMenuOpen)} size={25} />
      <Link href="/">
        <Tab isOpen={isMenuOpen}>Home</Tab>
      </Link>
      <Link href="/">
        <Tab isOpen={isMenuOpen}>Marketplace</Tab>
      </Link>
      <Search isOpen={isMenuOpen}>
        <SearchIcon />
        <Input placeholder="Search items, collections, and accounts" />
      </Search>
      <Link href="/">
        <Tab isOpen={isMenuOpen}>Create</Tab>
      </Link>
      <span onClick={() => authenticate()}>
        <Tab isOpen={isMenuOpen}>Sign Up/Sign In</Tab>
      </span>
    </Container>
  );
}

export default Header;
