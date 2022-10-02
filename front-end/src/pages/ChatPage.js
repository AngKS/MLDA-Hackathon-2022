import "../styles/chatPage.css";
import {TopBar} from "../common/Topbar"

function ChatPage() {

    return (
        <div class='width-100'>
            <TopBar current_page='Chat'/>

            <div className="w-3/5 mx-auto flex flex-row">
                <div className='red basis-1/2 mx-5'>
                    01
                </div>

                <div className='blue basis-1/2 mx-5'>
                    02
                </div>
            </div>
            
        </div>
    )
}

export { ChatPage }