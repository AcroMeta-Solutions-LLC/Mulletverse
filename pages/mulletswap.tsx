import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Main, Container } from "../styles/MulletSwapStyled";

type SourceType = "lifi" | "onramper";
const Mulletswap: NextPage = () => {
  const { query } = useRouter();
  const urlSource: SourceType = (Array.isArray(query.src) ? query.src[0] : query.src || "") as SourceType;
  const [source, setSource] = useState<SourceType>("lifi");

  useEffect(() => {
    setSource(urlSource);
  }, [urlSource]);

  return (
    <Main style={{ backgroundColor: "#FFFFFF" }}>
      <Container>
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
