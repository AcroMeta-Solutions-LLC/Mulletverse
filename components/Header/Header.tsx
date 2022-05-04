import React from "react";
import Link from "next/link";
import { Container, Search, Tab, Input, Icon } from "./HeaderStyled";

function Header() {
  return (
    <Container>
      <Link href="/">
        <Tab>Home</Tab>
      </Link>
      <Link href="/">
        <Tab>Marketplace</Tab>
      </Link>
      <Search>
        <Icon />
        <Input placeholder="Search items, collections, and accounts" />
      </Search>
      <Link href="/">
        <Tab>Create</Tab>
      </Link>
      <Link href="/">
        <Tab>Sign Up/Sign In</Tab>
      </Link>
    </Container>
  );
}

export default Header;
