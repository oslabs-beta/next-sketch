import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faFolderClosed } from '@fortawesome/free-solid-svg-icons';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useState } from 'react';
import { CodeContext, CodeSnippetContext } from '../../App';

interface Input {
  visible: boolean | undefined;
  isFolder: boolean | null | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Folder({ handleInsertNode, handleDeleteNode, explorer }: any) {
  const [expand, setExpand] = useState<boolean>(false);
  const [folderIcon, setFolderIcon] = useState<string>('▶');
  const [folderLogo, setFolderLogo] = useState(
    <FontAwesomeIcon icon={faFolderClosed} />
  );
//   const [componentName, setComponentName] = useContext(CodeContext);
  const [codeSnippet, setCodeSnippet] = useContext(CodeSnippetContext);

  const [showInput, setShowInput] = useState<Input>({
    visible: false,
    isFolder: null,
  });

  const handleNewFolder = (e?: React.MouseEvent, arg?: boolean) => {
    e?.stopPropagation();
    setExpand(true);
    setFolderIcon('▼');
    setFolderLogo(<FontAwesomeIcon icon={faFolderOpen} />);

    setShowInput({
      visible: true,
      isFolder: arg,
    });
  };

  const handleCode = async () => {
    console.log(explorer.preview)
    setCodeSnippet(explorer.preview)
  }

    const onAddFolder = async (e?: React.KeyboardEvent<HTMLInputElement>) => {
        if (e?.key === 'Enter' && e?.currentTarget.value) {
            handleInsertNode(explorer.id, e.currentTarget.value, showInput.isFolder)

            console.log('inaddfolder', e.currentTarget.value)

            let isFolder = showInput.isFolder

            console.log(explorer.name)

            const body ={"fileName": e.currentTarget.value, "folderName": explorer.name, "isFolder": isFolder}

            await fetch('http://localhost:3000/',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
        
            setShowInput({ ...showInput, visible: false })

        }

    }

  const handleDeleteFolder = async (e?: React.MouseEvent, arg?: boolean) => {
    e?.stopPropagation();
    handleDeleteNode(explorer.id);

    await fetch('http://localhost:3000/', {
      method: 'Delete',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: explorer.name }),
    });

    setShowInput({ ...showInput, visible: false });
  };

  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div
          className='folder'
          onClick={() => {
            if (!expand) {
              setFolderIcon('▼');
              setFolderLogo(<FontAwesomeIcon icon={faFolderOpen} />);
            } else {
              setFolderIcon('▶');
              setFolderLogo(<FontAwesomeIcon icon={faFolderClosed} />);
            }
            setExpand(!expand);
          }}
        >
          <span>
            {folderIcon} {folderLogo} {explorer.name}{' '}
          </span>

          <div>
            <button onClick={(e) => handleNewFolder(e, true)}>
              {' '}
              <FontAwesomeIcon icon={faFolderPlus} />{' '}
            </button>
            <button onClick={(e) => handleNewFolder(e, false)}>
              {' '}
              <FontAwesomeIcon icon={faFileCirclePlus} />{' '}
            </button>
            <button onClick={(e) => handleDeleteFolder(e, false)}>
              {' '}
              <FontAwesomeIcon icon={faTrash} />{' '}
            </button>
          </div>
        </div>

        <div style={{ display: expand ? 'block' : 'none', paddingLeft: 25 }}>
          {showInput.visible && (
            <div className='inputContainer'>
              <span>{showInput.isFolder ? ' 📁' : '📄'}</span>
              <input
                type='text'
                onKeyDown={onAddFolder}
                className='inputContainer__input'
                autoFocus
                onBlur={() => {
                  setShowInput({ ...showInput, visible: false });
                  setFolderIcon('▶');
                  setFolderLogo(<FontAwesomeIcon icon={faFolderClosed} />);
                  setExpand(false);
                }}
              />
            </div>
          )}

          {explorer.items.map((exp: any) => {
            return (
              <Folder
                handleInsertNode={handleInsertNode}
                handleDeleteNode={handleDeleteNode}
                explorer={exp}
                key={exp.id}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className='folder' onClick={() => handleCode(explorer)}>
        📄 {explorer.name}{' '}
        <button onClick={(e) => handleDeleteFolder(e, false)}>
          {' '}
          <FontAwesomeIcon icon={faTrash} />{' '}
        </button>
      </div>
    );
  }
}

export default Folder;
