import Navbar from '../components/Navbar'
import InputField from '../components/InputField'
import Chat from '../components/Chat'
import { useState } from 'react'
import React, { useRef, useEffect } from 'react'
import background from '../background3.png';


async function getInitialResponse() {
try {
        const res = await fetch(
            'http://localhost:8000/lawyer',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    "user_data": "Hi",
                    "legal_document": "DIVORCE SETTLEMENT AGREEMENT  This Divorce Settlement Agreement (the 'Agreement') is entered into on the 15th day of August, 2023, by and between Johnathan Smith, hereinafter referred to as Husband,and Emily Smith, hereinafter referred to as Wife, collectively referred to as the Parties.  RECITALS  WHEREAS, the Parties were lawfully married on the 28th day of June, 2010, in Springfield, Illinois, and have subsequently experienced irreconcilable differences leading to their decision to seek a divorce;  WHEREAS, the Parties desire to amicably settle all issues arising from their marriage, including property division, spousal support, child custody, child support, and other related matters;  NOW, THEREFORE, in consideration of the premises and mutual covenants contained herein, the Parties agree as follows:  1. PROPERTY DIVISION  1.1 Real Property: The marital home located at 123 Oak Street, Springfield, Illinois, shall be awarded to Wife. Husband shall execute any necessary documents to transfer the title and interest to Wife. Husband shall retain ownership of the vacation property situated at 456 Pine Avenue, Lakeview, Michigan.  1.2 Personal Property: The Parties shall equitably divide personal property, household items, and vehicles through a collaborative process within 60 days of the execution of this Agreement.  1.3 Financial Assets: The Parties shall divide financial assets (bank accounts, investments, retirement accounts) as follows:  Husband shall retain his retirement account with WealthBank. Wife shall retain her retirement account with InvestCorp. Joint savings accounts shall be equally divided between the Parties. 2. SPOUSAL SUPPORT  2.1 Spousal Support: Husband shall pay monthly spousal support to Wife in the amount of $1,500 for a period of 24 months, commencing on September 1, 2023. The spousal support shall be non-modifiable and non-transferable.  3. CHILD CUSTODY AND SUPPORT  3.1 Legal Custody: The Parties shall share joint legal custody of their minor children, Sophia Smith and Ethan Smith, with major decisions regarding education, medical care, and religion being made jointly.  3.2 Physical Custody: Wife shall have primary physical custody of the children. Husband shall have visitation rights every other weekend, alternating holidays, and from 4:00 PM to 7:00 PM on Wednesdays. The Parties shall cooperate to create a flexible schedule that accommodates the children's needs.  3.3 Child Support: Husband shall pay child support to Wife in accordance with the guidelines of Illinois for two children. Child support payments shall be made on the 1st day of each month, commencing on October 1, 2023.  4. MISCELLANEOUS  4.1 Tax Considerations: The Parties shall consult with their respective tax advisors to determine the most advantageous approach to filing taxes, taking into account their changed marital status.  4.2 Modification: This Agreement may only be modified in writing and signed by both Parties.  4.3 Governing Law: This Agreement shall be governed by and construed in accordance with the laws of the State of Illinois.  IN WITNESS WHEREOF, the Parties hereto have executed this Divorce Settlement Agreement as of the date first above written.  Johnathan Smith Emily Smith Husband's Signature Wife's Signature Date: August 15, 2023 Date: August 15, 2023  Oliver Davis Rachel Williams Witness 1's Signature Witness 2's Signature Date: August 15, 2023 Date: August 15, 2023",
                })
            }
        );

        if(res.ok) {
            const data = await res.json();
            return data;
        }

    } catch(error) {
        console.log('Something Went Wrong!', error);
    }
}

async function getBotResponse(user_query) {
try {
        const res = await fetch(
            'http://localhost:8000/lawyer',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    "user_data": user_query,
                    "legal_document": "DIVORCE SETTLEMENT AGREEMENT  This Divorce Settlement Agreement (the 'Agreement') is entered into on the 15th day of August, 2023, by and between Johnathan Smith, hereinafter referred to as Husband,and Emily Smith, hereinafter referred to as Wife, collectively referred to as the Parties.  RECITALS  WHEREAS, the Parties were lawfully married on the 28th day of June, 2010, in Springfield, Illinois, and have subsequently experienced irreconcilable differences leading to their decision to seek a divorce;  WHEREAS, the Parties desire to amicably settle all issues arising from their marriage, including property division, spousal support, child custody, child support, and other related matters;  NOW, THEREFORE, in consideration of the premises and mutual covenants contained herein, the Parties agree as follows:  1. PROPERTY DIVISION  1.1 Real Property: The marital home located at 123 Oak Street, Springfield, Illinois, shall be awarded to Wife. Husband shall execute any necessary documents to transfer the title and interest to Wife. Husband shall retain ownership of the vacation property situated at 456 Pine Avenue, Lakeview, Michigan.  1.2 Personal Property: The Parties shall equitably divide personal property, household items, and vehicles through a collaborative process within 60 days of the execution of this Agreement.  1.3 Financial Assets: The Parties shall divide financial assets (bank accounts, investments, retirement accounts) as follows:  Husband shall retain his retirement account with WealthBank. Wife shall retain her retirement account with InvestCorp. Joint savings accounts shall be equally divided between the Parties. 2. SPOUSAL SUPPORT  2.1 Spousal Support: Husband shall pay monthly spousal support to Wife in the amount of $1,500 for a period of 24 months, commencing on September 1, 2023. The spousal support shall be non-modifiable and non-transferable.  3. CHILD CUSTODY AND SUPPORT  3.1 Legal Custody: The Parties shall share joint legal custody of their minor children, Sophia Smith and Ethan Smith, with major decisions regarding education, medical care, and religion being made jointly.  3.2 Physical Custody: Wife shall have primary physical custody of the children. Husband shall have visitation rights every other weekend, alternating holidays, and from 4:00 PM to 7:00 PM on Wednesdays. The Parties shall cooperate to create a flexible schedule that accommodates the children's needs.  3.3 Child Support: Husband shall pay child support to Wife in accordance with the guidelines of Illinois for two children. Child support payments shall be made on the 1st day of each month, commencing on October 1, 2023.  4. MISCELLANEOUS  4.1 Tax Considerations: The Parties shall consult with their respective tax advisors to determine the most advantageous approach to filing taxes, taking into account their changed marital status.  4.2 Modification: This Agreement may only be modified in writing and signed by both Parties.  4.3 Governing Law: This Agreement shall be governed by and construed in accordance with the laws of the State of Illinois.  IN WITNESS WHEREOF, the Parties hereto have executed this Divorce Settlement Agreement as of the date first above written.  Johnathan Smith Emily Smith Husband's Signature Wife's Signature Date: August 15, 2023 Date: August 15, 2023  Oliver Davis Rachel Williams Witness 1's Signature Witness 2's Signature Date: August 15, 2023 Date: August 15, 2023",
                })
            }
        );

        if(res.ok) {
            const data = await res.json();
            return data;
        }

    } catch(error) {
        console.log('Something Went Wrong!', error);
    }
}

export default function Home() {

    let [chats, updateChats] = useState([])
    let [isChatLoading, updateIsChatLoading] = useState(false);

    const handleInputChange = async (value) => {
        let newChat = {
            response: false,
            message: value,
            isLoading: false
        }
        updateChats([...chats, newChat])
        scrollToBottom();

        updateIsChatLoading(true);
        let botResponse = undefined;
        console.log(value);
        botResponse = await getBotResponse(value);
        await console.log(botResponse);

        let botChat = {
            response: true,
            message: botResponse,
            isLoading: false
        }
        updateChats(prevChats => ([...prevChats, botChat]));
        updateIsChatLoading(false);
        // chats[chats.length - 1].message = await botResponse;
        // chats[chats.length - 1].isLoading = false;
        scrollToBottom();
    }

    const chatContainerRef = useRef(null);
    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    async function getDocumentData() {
        updateIsChatLoading(true);
        let botResponse = undefined;
        botResponse = await getInitialResponse();
        
        let botChat = {
            response: true,
            message: botResponse,
            isLoading: false
        }
        updateChats([...chats, botChat]);
        updateIsChatLoading(false);
        // console.log(chats);
        // chats[chats.length - 1].message = await botResponse;
        // chats[chats.length - 1].isLoading = false;
        scrollToBottom();
    }

    async function clearSession() {
        try {
            const res = await fetch(
                'http://localhost:8000/clear_session',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                }
            );
    
            if(res.ok) {
                const data = await res.json();
                return data;
            }
    
        } catch(error) {
            console.log('Something Went Wrong!', error);
        }
    }

    useEffect(() => {
        // const getresponse = async () => {
        //     let botResponse = undefined;
        //     botResponse = await getInitialResponse();

        //     console.log(chats, botResponse);
        //     console.log(chats[chats.length - 1]);
        //     chats[chats.length - 1].message = botResponse;
        //     chats[chats.length - 1].isLoading = false;
        //     console.log("updated chats : ", chats);
        //     updateChats(chats);
        // }
        // getresponse();
        scrollToBottom();
    }, [chats]);

    useEffect(() => {
        // clear session post request`
        clearSession();
        // get the base64 images
        // show welcome message
        getDocumentData(); 
    }, []);

    return (
        <section className={`max-w-7xl w-full border mx-auto`}>
            <div className="background w-screen h-screen absolute top-0 left-0 right-0 bottom-0 -z-10">
                <img src={background} alt="" className='h-full w-full'/>
            </div>
            <Navbar />
            <section className='h-[calc(100vh-100px)] w-full p-5 sm:pb-10'>
                <div className="h-full w-full bg-primary bg-opacity-30 border border-white rounded-[40px] p-5 sm:pb-10 flex flex-col justify-end items-center">
                    <div className="w-full max-w-3xl">
                        <div ref={chatContainerRef} className='chatscroll flex flex-col gap-5 my-5 max-w-3xl max-h-[60vh] sm:max-h-[60vh] py-10 overflow-y-scroll'>
                            { chats.map((chat, index) => {
                                return <Chat response={chat.response} text={chat.message} isLoading={chat.isLoading} />
                            }) }
                            { isChatLoading && <Chat response={true} text={""} isLoading={true} /> }
                        </div>
                        <InputField getInputValue={handleInputChange} />
                    </div>
                </div>
            </section>
        </section>
    )
}
