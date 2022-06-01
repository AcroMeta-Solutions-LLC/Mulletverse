import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Container, Content, Header } from "./CollapsableStyled";

type CollapsableProps = {
  title: string;
  isOpen?: boolean;
  children: React.ReactNode;
};

function Collapsable(props: CollapsableProps) {
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen || false);

  return (
    <Container>
      <Header isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <span>{props.title}</span>
        {isOpen ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
      </Header>
      {isOpen && <Content>{props.children}</Content>}
    </Container>
  );
}

export default Collapsable;
