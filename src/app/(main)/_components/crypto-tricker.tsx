"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";

const API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false";

const CryptoTicker = () => {
  const [cryptos, setCryptos] = useState<any[]>([]);
  const controls = useAnimation();
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    async function fetchCryptoData() {
      try {
        const res = await fetch(API_URL, { cache: "no-store" });
        const data = await res.json();
        setCryptos(data);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    }

    fetchCryptoData();
  }, []);

  // Duplicate data for infinite scrolling effect
  const extendedCryptoData = [...cryptos, ...cryptos, ...cryptos];

  useEffect(() => {
    if (!isPaused) {
      controls.start({
        x: ["0%", "-100%"],
        transition: { repeat: Infinity, duration: 60, ease: "linear" }, // Smooth scrolling
      });
    } else {
      controls.stop();
    }
  }, [isPaused, controls]);

  return (
    <div className="w-full overflow-hidden bg-[#020817] py-4">
      <motion.div
        className="flex w-max space-x-8"
        animate={controls}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
      >
        {extendedCryptoData.map((crypto, index) => (
          <div
            key={index}
            className="flex items-center cursor-pointer space-x-4 md:my-12 my-7 bg-[#0a1220] px-4 py-2 rounded-lg shadow-md hover:bg-[#0d1a30] transition"
          >
            <Image src={crypto.image} alt={crypto.name} width={30} height={30} className="rounded-full" />
            <div>
              <p className="text-white text-sm font-semibold">
                {crypto.name} ({crypto.symbol.toUpperCase()})
              </p>
              <p className="text-gray-400 text-xs">
                ${crypto.current_price.toLocaleString()}{" "}
                <span
                  className={
                    crypto.price_change_percentage_24h < 0 ? "text-red-500" : "text-green-400"
                  }
                >
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </span>
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default CryptoTicker;
