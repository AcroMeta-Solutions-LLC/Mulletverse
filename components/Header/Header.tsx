import React, { Fragment, useState, useRef } from "react";
import Link from "next/link";
import { Container, Search, Tab, Input, SearchIcon, MenuIcon, UserWrapper, UserAddress } from "./HeaderStyled";
import { useMoralis } from "react-moralis";
import { Blockie, PopoverDropdown, PopoverElement, WalletModal } from "web3uikit";
import { getDisplayName } from "../../helpers/getDisplayName";
import { useRouter } from "next/router";
import COLORS from "../../constants/colors";
import { useClickOutside } from "../../hooks/useClickOutside";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const { isAuthenticated, user, logout } = useMoralis();
  const containerRef = useRef<HTMLElement>(null);

  const { pathname } = useRouter();
  const isLandingPage = pathname === "/";

  useClickOutside(containerRef, () => setIsMenuOpen(false));

  const openAuthModal = () => {
    setIsConnectModalOpen(true);
    setIsMenuOpen(false);
  };

  return (
    <Fragment>
      <Container isOpen={isMenuOpen} isLandingPage={isLandingPage} ref={containerRef}>
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
        {!isAuthenticated && (
          <span onClick={openAuthModal}>
            <Tab isLandingPage={isLandingPage} isOpen={isMenuOpen}>
              Sign Up/Sign In
            </Tab>
          </span>
        )}
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
      <WalletModal moralisAuth={true} isOpened={isConnectModalOpen} setIsOpened={setIsConnectModalOpen} />
    </Fragment>
  );
}

export default Header;
