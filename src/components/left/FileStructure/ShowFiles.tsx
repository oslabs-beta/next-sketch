import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';

const ShowFiles = () => {

    const [content, setContent] = useState<string[]>([]);


    const [folderIcon, setFolderIcon] = useState<boolean>(false);

    useEffect(() => {
        fetch("http://localhost:3000/")
            .then((res) => res.json())
            .then((data) => setContent(data))
            .catch((err) => console.error(err))
    }, []);



    function handleClick() {
        setFolderIcon(true);

        if (folderIcon === false) setFolderIcon(true)

    }

    return (
        <div>
            {content.map((item, index) => (
                Array.isArray(item) ?
                    <div key={index} onClick={handleClick}>

                        {
                            folderIcon ? <FontAwesomeIcon icon={faFolderOpen} /> : <FontAwesomeIcon icon={faFolder} />

                        }
                        {item}

                    </div> :

                    <div key={index} > {item}</div>
            ))}
        </div>
    )



}




export default ShowFiles;