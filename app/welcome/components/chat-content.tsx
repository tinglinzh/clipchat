import type { ReactNode } from "react";

const ChatContent = (): ReactNode => {
    return (
        <div className="bg-[#292929] h-full relative">
            <div className="bg-[#3c3c3c] absolute w-full top-0 h-[64px] text-center flex flex-col justify-center" >
                <p className="text-lg">
                    Tom
                </p>
                <p className="text-gray-400">online</p>
            </div>
            <div className="h-full overflow-y-auto">

            </div>
        </div>
    );
};

export default ChatContent;