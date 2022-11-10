import Moralis from "moralis/types";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useTheme } from "styled-components";
import { Loading, useNotification } from "web3uikit";
import GuildCard from "../components/GuildCard/GuildCard";
import {
  LoadingWrapper,
  Main,
  Section,
  Title,
  Wrapper,
} from "../styles/StorefrontsStyled";
import { GuildType } from "../types/GuildType";

const Account: NextPage = () => {
  const { user, isInitialized, Moralis } = useMoralis();
  const [isLoading, setIsLoading] = useState(false);
  const [guilds, setGuilds] = useState<GuildType[]>([]);
  const alert = useNotification();
  const theme: any = useTheme();

  const fetchGuilds = async (): Promise<
    Moralis.Object<Moralis.Attributes>[]
  > => {
    const accounts = new Moralis.Query("Guilds");
    const response =
      (await accounts.find()) as Moralis.Object<Moralis.Attributes>[];
    return response;
  };

  useEffect(() => {
    if (isInitialized && user) {
      setIsLoading(true);
      fetchGuilds()
        .then((response) => {
          const guildList: GuildType[] = response.map((item) => ({
            address: item.get("address"),
            guildName: item.get("guildName"),
            bio: item.get("bio"),
            imageUrl: item.get("imageUrl"),
            inviteLink: item.get("inviteLink"),
            interests: item.get("interests"),
          }));
          setGuilds(guildList);
        })
        .catch(() => {
          alert({
            type: "error",
            title: "Error",
            message: "Error fetching the storefront data.",
            position: "topR",
          });
        })
        .finally(() => setIsLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, user]);

  return (
    <Main>
      <Wrapper>
        <Title>Storefronts</Title>
        {isLoading && (
          <LoadingWrapper>
            <Loading spinnerColor={theme.PRIMARY} />
          </LoadingWrapper>
        )}
        <Section>
          {guilds.map((guild, i) => (
            <GuildCard key={i} {...guild} />
          ))}
        </Section>
      </Wrapper>
    </Main>
  );
};

export default Account;
