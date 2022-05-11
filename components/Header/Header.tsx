import React, { useState } from "react";
import Link from "next/link";
import { Container, Search, Tab, Input, SearchIcon, MenuIcon, UserWrapper, UserAddress } from "./HeaderStyled";
import { useMoralis } from "react-moralis";
import { Blockie, Loading, PopoverDropdown, PopoverElement } from "web3uikit";
import { toast } from "react-toastify";
import { getDisplayName } from "../../helpers/getDisplayName";
import { useRouter } from "next/router";
import COLORS from "../../constants/colors";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { authenticate, isAuthenticated, user, logout } = useMoralis();
  const { pathname, push } = useRouter();
  const isLandingPage = pathname === "/";

  const signIn = () => {
    setIsLoading(true);
    authenticate()
      .then(() => {
        push({ pathname: "/portfolio" });
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Container isOpen={isMenuOpen} isLandingPage={isLandingPage}>
      <MenuIcon
        color={isLandingPage ? COLORS.CLEAR : COLORS.DARK}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        size={25}
      />
      {!isAuthenticated && (
        <Link href="/">
          <Tab isLandingPage={isLandingPage} isOpen={isMenuOpen}>
            Home
          </Tab>
        </Link>
      )}
      {isAuthenticated && (
        <Link href="/portfolio">
          <Tab isLandingPage={isLandingPage} isOpen={isMenuOpen}>
            Portfolio
          </Tab>
        </Link>
      )}
      <Link href="/marketplace">
        <Tab isLandingPage={isLandingPage} isOpen={isMenuOpen}>
          Marketplace
        </Tab>
      </Link>
      <Search isOpen={isMenuOpen}>
        <SearchIcon color={isLandingPage ? COLORS.CLEAR : COLORS.DARK} />
        <Input isLandingPage={isLandingPage} placeholder="Search items, collections, and accounts" />
      </Search>
      <Link href="/">
        <Tab isLandingPage={isLandingPage} isOpen={isMenuOpen}>
          Create
        </Tab>
      </Link>
      {!isLoading && !isAuthenticated && (
        <span onClick={signIn}>
          <Tab isLandingPage={isLandingPage} isOpen={isMenuOpen}>
            Sign Up/Sign In
          </Tab>
        </span>
      )}
      {isLoading && <Loading />}
      {isAuthenticated && (
        <PopoverDropdown
          moveBody={-55}
          parent={
            <UserWrapper isOpen={isMenuOpen}>
              <Blockie seed={user?.get("ethAddress")} />
              <UserAddress isLandingPage={isLandingPage}>{getDisplayName(user?.get("ethAddress"))}</UserAddress>
            </UserWrapper>
          }
          position="bottom"
        >
          <PopoverElement icon="cog" text="Account Settings" textColor="#FFFFFF" />
          <PopoverElement icon="logOut" iconColor="#EB5757" onClick={logout} text="Logout" textColor="#EB5757" />
        </PopoverDropdown>
      )}
    </Container>
  );
}

export default Header;
