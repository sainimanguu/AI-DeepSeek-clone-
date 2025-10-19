'use client';
import { assets } from "@/assets/assets";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [expand, setExpand] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  return (
    <div className="h-screen flex">
      <Sidebar expand={expand} setExpand={setExpand} />
      <div className="flex-1 bg-[#292a2d] text-white relative flex flex-col">
        {/* Mobile Header */}
        <div className="md:hidden absolute top-6 left-0 right-0 px-4 flex items-center justify-between">
          <Image
            onClick={() => setExpand(!expand)}
            className="rotate-180 cursor-pointer"
            src={assets.menu_icon}
            alt=""
          />
          <Image className="opacity-70" src={assets.chat_icon} alt="" />
        </div>

        {/* Center Content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          {messages.length === 0 ? (
            <>
              <div className="flex items-center gap-3">
                <Image src={assets.logo_icon} alt="" className="h-16 w-13" />
                <p className="text-2xl font-medium">Hi, I am DeepSeek</p>
              </div>
              <p className="text-sm text-gray-300">
                How can I help you today?
              </p>
            </>
          ) : (
            <div></div>
          )
          }
          <p className="text-xs absolute bottom-1 text-gray-500">AI-generated, for refrence only</p>
        </div>
      </div>
    </div>
  );
}
