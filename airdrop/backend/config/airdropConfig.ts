import path from "path";

export default {
  // Number of decimals of the airdrop token.
  decimals: 18,
  // For demonstration purposes, any address is eligible to this minimum amount.
  // This is not a problem since we are restricting claiming to X addresses per person maximum.
  minAmount: 5,
  // Output path for the Merkle tree dump
  outputPath: path.join(__dirname, "../../shared/merkle.json"),
  // This is where you specify the list of addresses you deemed eligble for your airdrop and
  // how much tokens they are entitled to claim based on your criteria.
  activeAccounts: {
    "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266": 8488,
    "0x70997970c51812dc3a010c7d01b50e0d17dc79c8": 5473,
    "0x3a5e2bEe2f7D50242ABCE4dBCEdCc87664BD38d7": 166,
    "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc": 435,
    "0x90f79bf6eb2c4f870365e785982e1f101e93b906": 9306,
    "0x15d34aaf54267db7d7c367839aaf71a00a2c6a65": 55,
    "0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc": 6483,
  },
};
