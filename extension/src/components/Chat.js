const Chat = ({response, text, isLoading}) => {
    return (
        <div className={`flex ${response ? '' : 'flex-row-reverse'} items-end gap-2`}>
            <div className={`profile shadow-2xl rounded-full w-10 h-10 bg-white border ${response ? 'border-primaryGreen' : 'border-primaryPurple'} grid place-content-center`}>
                <p className="text-lg">{response ? '🤖' :  '🧑🏻‍🦱'}</p>
            </div>
            <div className={`message shadow-2xl rounded-3xl ${response ? 'bg-black text-white' : 'bg-purple-400 text-white'} text-sm sm:text-base p-4 px-5 max-w-[300px] sm:max-w-[300px]`}>
                { isLoading ? (
                    <div className="loading py-1 pb-2">
                        <div className="dot one"></div>
                        <div className="dot two"></div>
                        <div className="dot three"></div>
                    </div>
                ) : <p>{text}</p> }
            </div>
        </div>
    );
}
 
export default Chat;