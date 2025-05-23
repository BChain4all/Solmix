"use client"; // This is a client component
import BlocklyEditor from "@/app/solmix/blockly/workspace";
import { useState } from "react";

import { FloatingChat } from './components/FloatingChat';

// Poe
import { sendMessageToPoe } from './components/FloatingChat/poeApi';
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";

interface PoeChatProps {
    apiKey: string;
    botName: string;
    chatId: string;
}

//async function sendPoeMessage(message: string) {
//
//    return `Custom response to: "${message}"`;
//}

export default function SolmixHome() {
    const [state, setState] = useState("");
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { title: "Solidity", content: "Here the Solidity code." },
        { title: "Description", content: "Here the LLM-based Smart Contract description." }
    ];

    // Poe
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function sendPoeMessage(message: string){
        if (!message.trim()) return;

        setIsLoading(true);
        setError(null);

        let apiKey = "oWMgrFELvG8Fer2BEX9A2w%3D%3D";
        let botName = "GPT-4o";
        let chatId = "364sl53ji0wvcmbnx9x";

        try {
            const result = await sendMessageToPoe(apiKey, botName, chatId, message);

            if (result.status === 'success') {
                return result.text || 'Message sent successfully';
            } else {
                return result.error || 'Failed to send message';
            }
        } catch (err) {
            console.error(err);
            return 'An unexpected error occurred';
        } finally {
            setIsLoading(false);
        }
    }

    return (

        <main className="w-full min-h-screen bg-secondary">

            <div className="w-full min-h-screen grid grid-cols-3 ">
                <div className="col-span-2 solmix-tools p-5">
                    <BlocklyEditor/>
                </div>
                <div className="col-span-1 solmix-tools pt-5 pb-5 pr-5">
                    <div className="bg-white w-full min-h-full rounded-lg shadow-xl">

                        <div className="w-full max-w-3xl mx-auto p-4">
                            <div className="bg-secondary p-1 rounded-lg flex mb-6">
                                {tabs.map((tab, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveTab(index)}
                                        className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
                                            activeTab === index
                                                ? "bg-white shadow text-foreground"
                                                : "text-gray-600 hover:text-gray-900"
                                        }`}
                                    >
                                        {tab.title}
                                    </button>
                                ))}
                            </div>
                            <div className="p-6 bg-white rounded-lg shadow-md">
                                {tabs[activeTab].content}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <FloatingChat
                title="Solmix AI Assistant"
                initialMessage="Hello! How do you want to edit your Smart Contract?"
                customResponse={async (message) => {
                    // You can implement your own response logic here
                    // For example, call an API to get a response
                    return sendPoeMessage(`${message}`);
                }}
                primaryColor="#f27b48"
            />

        </main>
    )
        ;
}
