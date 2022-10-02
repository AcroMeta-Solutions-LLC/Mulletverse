import React from "react";
import Link from "next/link";
import { FaTwitter, FaDiscord, FaTiktok, FaInstagram, FaMedium } from "react-icons/fa";
import { useRouter } from "next/router";
import { Container, Tab, Links, Redirect } from "./FooterStyled";

function Footer() {
  const { pathname } = useRouter();
  const PATHS_WITH_FIXED_FOOTER: string[] = [];

  return (
    <Container isFixed={PATHS_WITH_FIXED_FOOTER.includes(pathname)}>
      <Links>
        <Link href="">
          <Redirect href="https://twitter.com/Mulletverse" target="_blank">
            <FaTwitter size={25} />
          </Redirect>
        </Link>
        <Link href="">
          <Redirect href="https://discord.gg/uWtaC94MbE" target="_blank">
            <FaDiscord size={25} />
          </Redirect>
        </Link>
        <Link href="">
          <Redirect href="https://www.tiktok.com/@mulletverse?lang=en" target="_blank">
            <FaTiktok size={25} />
          </Redirect>
        </Link>
        <Link href="">
          <Redirect href="https://www.instagram.com/mulletverse/" target="_blank">
            <FaInstagram size={25} />
          </Redirect>
        </Link>
        <Link href="">
          <Redirect href="https://medium.com/@mulletverse" target="_blank">
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
