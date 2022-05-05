import React from "react";
import Link from "next/link";
import { FaTwitter, FaDiscord, FaTiktok, FaFacebook, FaInstagram, FaMedium } from "react-icons/fa";
import { Container, Tab, Links, Redirect } from "./FooterStyled";

function Footer() {
  return (
    <Container>
      <Links>
        <Link href="/">
          <Redirect>
            <FaTwitter size={25} />
          </Redirect>
        </Link>
        <Link href="/">
          <Redirect>
            <FaDiscord size={25} />
          </Redirect>
        </Link>
        <Link href="/">
          <Redirect>
            <FaTiktok size={25} />
          </Redirect>
        </Link>
        <Link href="/">
          <Redirect>
            <FaFacebook size={25} />
          </Redirect>
        </Link>
        <Link href="/">
          <Redirect>
            <FaInstagram size={25} />
          </Redirect>
        </Link>
        <Link href="/">
          <Redirect>
            <FaMedium size={25} />
          </Redirect>
        </Link>
      </Links>
      <Links>
        <Link href="/">
          <Tab>Creator App</Tab>
        </Link>
        <Link href="/">
          <Tab>Docs</Tab>
        </Link>
        <Link href="/">
          <Tab>Team</Tab>
        </Link>
        <Link href="/">
          <Tab>Contact Us</Tab>
        </Link>
      </Links>
    </Container>
  );
}

export default Footer;
