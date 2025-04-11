import { ReactNode } from "react";

export default function Divider({ text = '' }: { text: string }): ReactNode {
    return <div className="flex items-center my-4">
        <div className="flex-grow h-px bg-gradient-to-r from-transparent to-gray-400"></div>
        <span className="mx-4 text-white whitespace-nowrap">{text}</span>
        <div className="flex-grow h-px bg-gradient-to-r from-gray-400 to-transparent"></div>
    </div>;
}