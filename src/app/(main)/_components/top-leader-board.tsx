"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Generate dummy users (Replace with API if needed)
const generateUsers = () => [
  { name: "Alice", earnings: 12500 },
  { name: "Bob", earnings: 9800 },
  { name: "Charlie", earnings: 8700 },
  { name: "David", earnings: 7650 },
  { name: "Eva", earnings: 7200 },
  { name: "Frank", earnings: 6900 },
  { name: "Grace", earnings: 6300 },
  { name: "Henry", earnings: 5900 },
  { name: "Ivy", earnings: 5600 },
  { name: "Jack", earnings: 5300 },
];

const TopEarningUsers = () => {
  const [users, setUsers] = useState(generateUsers());

  useEffect(() => {
    const interval = setInterval(() => {
      setUsers((prevUsers) =>
        [...prevUsers]
          .map((user) => ({
            ...user,
            earnings: user.earnings + Math.floor(Math.random() * 500),
          }))
          .sort((a, b) => b.earnings - a.earnings) // Keep sorted by earnings
      );
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto bg-[#020817] p-6 rounded-xl shadow-lg border border-[#0a1220]">
      <h2 className="text-white text-2xl font-bold mb-4 text-center">
        🏆 Top Earnings Users
      </h2>
      <div className="space-y-3">
        {users.map((user, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ scale: 1.02, boxShadow: "0px 0px 12px rgba(255, 255, 255, 0.2)" }}
            className={`flex items-center cursor-pointer justify-between p-3 rounded-lg transition-all ${
              index === 0
                ? "bg-yellow-500 text-black font-bold"
                : index === 1
                ? "bg-gray-500 text-white"
                : index === 2
                ? "bg-orange-500 text-white"
                : "bg-[#0a1220] text-white hover:bg-[#0d1a30]"
            }`}
          >
            <div className="flex items-center space-x-3">
              <Image
                src={`https://avatar.iran.liara.run/public/${user.name}`}
                alt={user.name}
                width={40}
                height={40}
                className="rounded-full border border-gray-300"
              />
              <p className="font-medium">{user.name}</p>
            </div>
            <motion.p
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="font-semibold"
            >
              ${user.earnings.toLocaleString()}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TopEarningUsers;
