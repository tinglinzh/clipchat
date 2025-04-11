import type { ReactNode } from "react";
import ChatContent from "./chat-content";
const Chat = (): ReactNode => {
    return (
        <div className="bg-[#292929] h-[70vh] relative">
            <div className="bg-[#3c3c3c] absolute z-20 backdrop-opacity-10 w-full backdrop-blur-xs top-0 h-[64px] text-center flex flex-col justify-center" >
                <p className="text-lg">
                    Tom
                </p>
                <p className="text-gray-400">online</p>
            </div>
            <ChatContent />
        </div>
    );
};

export default Chat;