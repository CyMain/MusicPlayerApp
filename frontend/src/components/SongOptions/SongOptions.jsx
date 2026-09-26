import { useSongs } from "../../Contexts/SongsContextFile"
import "./SongOptions.css"



function SongOptions({poppedUp, setPoppedUp, functionsObject}){
    function handlePopUp(e){
        e.stopPropagation()
        if (poppedUp){
            setPoppedUp(false)
            console.log("Popup is now false")
        }else{
            setPoppedUp(true)
            console.log("Popup is now true")
        }
    }

    const handleDelete = (e) => {
        e.stopPropagation();
        setPoppedUp(false);
        // Add your delete dispatch or API call here
        const { dispatch } = useSongs()
    };
    
    return(
        <>
            {
                poppedUp && (
                    <ul 
                        className="options-feature-pop-up"
                        onMouseLeave={handlePopUp}
                    >
                        <li className="song-option"
                            onClick={(e)=>e.stopPropagation()}
                        >
                            Edit
                        </li>
                        <li className="song-option"
                            onClick={handleDelete}
                        >
                            Delete
                        </li>
                        {functionsObject.map(
                            (func)=>{
                                return(
                                    <li key={func.func_id} className="song-option"
                                        onClick={()=>func.func_func(func.imp_info.id)}
                                    >
                                        {func.func_label}
                                    </li>
                                )
                            }
                        )}
                    </ul>
                )
            }
        </>
    )
}

export default SongOptions