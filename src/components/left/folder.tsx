

interface Input {
    visible: boolean | undefined,
    isFolder: boolean | null | undefined
}

import React, { useEffect, useState } from "react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Folder({ handleInsertNode, handleDeleteNode, explorer }: any) {
    
    const [expand, setExpand] = useState<boolean>(false);
    const [folderIcon, setFolderIcon] = useState<string>('>');

    const [showInput, setShowInput] = useState<Input>({
        visible: false,
        isFolder: null
    })

    const handleNewFolder = (e?: React.MouseEvent, arg?: boolean) => {
        e?.stopPropagation();
        setExpand(true)
        setFolderIcon('⌄')
        setShowInput({
            visible: true,
            isFolder: arg,
        })
    };

    const onAddFolder = (e?: React.KeyboardEvent<HTMLInputElement>) => {
        if (e?.key === 'Enter' && e?.currentTarget.value) {
            handleInsertNode(explorer.id, e.currentTarget.value, showInput.isFolder)

            setShowInput({ ...showInput, visible: false })

        }
    }

    const handleDeleteFolder = (e?: React.MouseEvent, arg?: boolean) => {
        e?.stopPropagation();
        handleDeleteNode(explorer.id)
        setShowInput({ ...showInput, visible: false })

    }

   

    if (explorer.isFolder) {
        return <div style={{ marginTop: 5 }}>

        


            <div className="folder" onClick={() => {
                if (!expand) setFolderIcon('⌄')
                else setFolderIcon('>')
                setExpand(!expand)
            }
            }>

                <span>{folderIcon} 📁 {explorer.name} </span>

                <div>
                    <button onClick={(e) => handleNewFolder(e, true)}> Folder+ </button>
                    <button onClick={(e) => handleNewFolder(e, false)}> File+ </button>
                    <button onClick={(e) => handleDeleteFolder(e, false)}> Delete </button>

                </div>

            </div>

            <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
                {
                    showInput.visible && (
                        <div className='inputContainer'>
                            <span>{showInput.isFolder ? " 📁" : "📄"}</span>
                            <input
                                type="text"
                                onKeyDown={onAddFolder}
                                className="inputContainer__input"
                                autoFocus
                                onBlur={() => {
                                    setShowInput({ ...showInput, visible: false })
                                        , setFolderIcon('>')
                                }}
                            />
                        </div>
                    )
                }

                {explorer.items.map((exp) => {
                    return <Folder handleInsertNode={handleInsertNode} handleDeleteNode ={handleDeleteNode} explorer={exp} key={exp.id} />
                })}
            </div>
        </div>
    } else {
        return (
        
        <div className = 'folder'>
        
        📄 {explorer.name} <button onClick={(e) => handleDeleteFolder(e, false)}> Delete </button>

       
        </div>
        )
    }
}

export default Folder;