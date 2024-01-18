"use client";
import { useState } from "react";
import { getBalance, transfer } from "@/service/metamask";
import Image from "next/image";

export default function Home() {
  const [message, setMessage] = useState();
  const [address, setAddress] = useState(
    process.env.NEXT_PUBLIC_MY_WALLET_ADDRESS
  );
  const [to, setTo] = useState(process.env.NEXT_PUBLIC_WALLET_DESTINATION);
  const [quantity, setQuantity] = useState("0.01");
  async function getBalanceClick() {
    try {
      const balance = await getBalance(address);

      setMessage(balance as any);
    } catch (error) {
      console.error("Erro ao obter saldo:", error);
    }
  }

  async function transferClick() {
    try {
      const message = await transfer(address, to, quantity);
      setMessage(message as any);
    } catch (error) {
      console.error("Erro ao obter saldo:", error);
    }
  }

  return (
    <div className="flex justify-center items-center flex-col gap-4 p-8 bg-slate-900 text-slate-100 h-screen">
      <Image
        src="/fox.png"
        width={400}
        height={400}
        alt="Imagem"
        className="transform hover:rotate-180 transition-transform duration-300 ease-in-out animate-bounce"
      />

      <div className="w-2/4 flex justify-center items-center flex-col gap-4 p-8 b bg-slate-950 rounded-xl">
        <h2>Wallet:</h2>
        <input
          className="w-4/5 px-1.5 bg-slate-100 border-neutral-100 text-hugo rounded"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <h2>To:</h2>
        <input
          className="w-4/5  px-1.5 bg-slate-100 border-neutral-100 text-hugo rounded"
          type="text"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />

        <h2>Quantity:</h2>
        <input
          className="w-4/5  px-1.5 bg-slate-100 border-neutral-100 text-hugo rounded"
          type="text"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <div className="flex mt-4 gap-4 justify-center">
          <button
            className="bg-blue-900 px-4 py-2 rounded-lg"
            type="button"
            onClick={getBalanceClick}
          >
            Get Balance
          </button>

          <button
            className="bg-blue-900 px-4 py-2 rounded-lg"
            type="button"
            onClick={transferClick}
          >
            Transfer
          </button>
        </div>

        {message && <p className="text-2xl">{String(message)}</p>}
      </div>
    </div>
  );
}
