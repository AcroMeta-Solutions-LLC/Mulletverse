import type { NextPage } from "next";
import { useState } from "react";
import { Select } from "web3uikit";
import { Main, Container, SourceHeader } from "../../styles/MulletSwapStyled";

type SourceType = "lifi" | "onramper";
const Mulletswap: NextPage = () => {
  const [source, setSource] = useState<SourceType>("lifi");
  const SOURCES = [
    { id: "lifi", label: "LI:FI" },
    { id: "onramper", label: "Onramper" },
  ];

  return (
    <Main style={{ backgroundColor: "#FFFFFF" }}>
      <Container>
        <SourceHeader>
          <Select
            defaultOptionIndex={0}
            onChange={({ id }) => setSource(id as SourceType)}
            options={SOURCES}
            prefixText="Chain:"
            value={source}
          />
        </SourceHeader>
        {source === "lifi" && (
          <iframe
            height="100%"
            width="100%"
            src="https://transferto.xyz/embed"
            title="Mulletswap"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        )}
        {source === "onramper" && (
          <iframe
            style={{
              borderRadius: 10,
              boxShadow: "0 2px 10px 0 rgba(0,0,0,.20)",
              margin: 20,
              maxWidth: 420,
              alignSelf: "center",
            }}
            src="https://widget.onramper.com?color=266677&apiKey=pk_test_wqxNFCCKmmQXLNoavH1r_clEYnBA8xAVGmNRY02Xv7M0"
            height="660px"
            width="482px"
            title="Onramper widget"
            allow="accelerometer; autoplay; camera; gyroscope; payment"
          ></iframe>
        )}
      </Container>
    </Main>
  );
};

export default Mulletswap;
