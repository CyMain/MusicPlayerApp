function SongOptions({poppedUp, setPoppedUp}){
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
                    </ul>
                )
            }
        </>
    )
}

export default SongOptions