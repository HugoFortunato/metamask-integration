import Web3 from "web3";

export async function getMetaMaskProvider() {
  if (!window.ethereum) throw new Error("No MetaMask found!");

  const web3 = new Web3(window.ethereum);

  const accounts = await web3.eth.requestAccounts();

  if (!accounts || !accounts.length)
    throw new Error("No MetaMask accounts found!");

  return web3;
}

export async function getBalance(address) {
  const web3 = await getMetaMaskProvider();
  const balance = await web3.eth.getBalance(address);

  return web3.utils.fromWei(balance, "ether");
}

export async function transfer(from, to, quantity) {
  const web3 = await getMetaMaskProvider();
  const value = web3.utils.toWei(quantity, "ether");
  const nonce = await web3.eth.getTransactionCount(from, "latest");

  const transaction = {
    from,
    to,
    value,
    gas: 21000,
    nonce,
  };

  const tx = await web3.eth.sendTransaction(transaction);

  return tx.transactionHash;
}
