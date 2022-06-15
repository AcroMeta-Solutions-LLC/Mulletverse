import { CHART_COLORS } from "../constants/colors";

export const ChartData = [
  { name: "Boo VIB", value: 14, color: CHART_COLORS[0] },
  { name: "Meta Legends", value: 11, color: CHART_COLORS[1] },
  { name: "Creative Owls", value: 10, color: CHART_COLORS[2] },
  { name: "Beluga", value: 25, color: CHART_COLORS[3] },
  { name: "Coinlaundry", value: 40, color: CHART_COLORS[4] },
];

const collectionNFTs: { imageURL: string; address: string; chain: string }[] = [
  {
    address: "0x246e29ef6987637e48e7509f91521ce64eb8c831",
    chain: "eth",
    imageURL: "https://cbc.mypinata.cloud/ipfs/QmVExYYUUXAj3Fc5dYTKBu7n7vRiFWH8faG3MhVLPxHQhh/9205.png",
  },
  {
    address: "0x36122c9fadf011d64e2b3f68037862198383b08e",
    chain: "eth",
    imageURL: "https://tdbc.mypinata.cloud/ipfs/QmeGEY5z3DvpZZmiKwhhmzGS4DJ5i6gwULYY5UHaBZ11fT",
  },
  {
    address: "0x1a92f7381b9f03921564a437210bb9396471050c",
    chain: "eth",
    imageURL: "https://ipfs.io/ipfs/QmUPGadp5BQL66dhxB4ms4BrQeeqMWvFck81GVn4WDoB7Z",
  },
  {
    address: "0xc9a1a17d5f6ad4f7dd57fc7e8f009cda8a877344",
    chain: "eth",
    imageURL: "ipfs://QmNtV8c4bTrvTGbDFqmu3GR2yCr2xw1z6rKVnPZrCt9kPb",
  },
  {
    address: "0x1a92f7381b9f03921564a437210bb9396471050c",
    chain: "eth",
    imageURL: "https://ipfs.io/ipfs/QmWnqoh5RH2GNg1aSohFiC3wmzf1zfFTkKhV7mzbMNCVXc",
  },
  {
    address: "0x495f947276749ce646f68ac8c248420045cb7b5e",
    chain: "eth",
    imageURL:
      "https://lh3.googleusercontent.com/AEk4OJPFRWaJhFwBaRJBBLXhRphtsfQoDCPzM2glwWK0mcPkaq8gqYCNjVmG0rThG-V7HiD0XSZ0Vx3DYjqE4a88nk7NHgg6tJXj",
  },
];

export const Collections = [
  {
    address: "1",
    imageURL: "https://tdbc.mypinata.cloud/ipfs/QmeGEY5z3DvpZZmiKwhhmzGS4DJ5i6gwULYY5UHaBZ11fT",
    name: "Bored Ape YC",
    owners: 50,
    floorPrice: 20,
    volume: 2.1,
    items: collectionNFTs,
  },
  {
    address: "2",
    imageURL: "https://tdbc.mypinata.cloud/ipfs/QmeGEY5z3DvpZZmiKwhhmzGS4DJ5i6gwULYY5UHaBZ11fT",
    name: "Board Ape Yuk Club",
    owners: 250,
    floorPrice: 11,
    volume: 2.5,
    items: collectionNFTs.slice(0, 2),
  },
  {
    address: "3",
    imageURL: "https://tdbc.mypinata.cloud/ipfs/QmeGEY5z3DvpZZmiKwhhmzGS4DJ5i6gwULYY5UHaBZ11fT",
    name: "Lorem ipsum",
    owners: 10,
    floorPrice: 22,
    volume: 2.1,
    items: collectionNFTs.slice(1, 3),
  },
  {
    address: "4",
    imageURL: "https://tdbc.mypinata.cloud/ipfs/QmeGEY5z3DvpZZmiKwhhmzGS4DJ5i6gwULYY5UHaBZ11fT",
    name: "Dolor sit amet",
    owners: 220,
    floorPrice: 15,
    volume: 4.3,
    items: collectionNFTs.slice(0, 3),
  },
  {
    address: "5",
    imageURL: "https://tdbc.mypinata.cloud/ipfs/QmeGEY5z3DvpZZmiKwhhmzGS4DJ5i6gwULYY5UHaBZ11fT",
    name: "Consectetur Adipiscing",
    owners: 39,
    floorPrice: 18,
    volume: 1.8,
    items: collectionNFTs.slice(0, 1),
  },
  {
    address: "6",
    imageURL: "https://tdbc.mypinata.cloud/ipfs/QmeGEY5z3DvpZZmiKwhhmzGS4DJ5i6gwULYY5UHaBZ11fT",
    name: "Proin rutrum lorem a lorem auctor",
    owners: 90,
    floorPrice: 3,
    volume: 2.1,
    items: collectionNFTs,
  },
  {
    address: "7",
    imageURL: "https://tdbc.mypinata.cloud/ipfs/QmeGEY5z3DvpZZmiKwhhmzGS4DJ5i6gwULYY5UHaBZ11fT",
    name: "Ligula Dapibus",
    owners: 760,
    floorPrice: 34,
    volume: 1.2,
    items: [...collectionNFTs, ...collectionNFTs],
  },
  {
    address: "8",
    imageURL: "https://tdbc.mypinata.cloud/ipfs/QmeGEY5z3DvpZZmiKwhhmzGS4DJ5i6gwULYY5UHaBZ11fT",
    name: "Sollicitudin",
    owners: 140,
    floorPrice: 11,
    volume: 2.1,
    items: collectionNFTs.slice(1, 1),
  },
];
