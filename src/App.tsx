// import AddHTMLTags from "./components/middle/AddHTMLTags";
// import ShowFiles from "./components/left/FileStructure/ShowFiles";
import { useState } from "react";
import explorer from "./components/left/data/folderData";
import Folder from "./components/left/folder.tsx"
import useTraverseTree from "./components/left/hooks/use-traverse-tree.ts";
// const fs = require('fs');
// const filepath = './components/left/data/folderData.ts'

const App = () => {
    const [explorerData, setExplorerData] = useState(explorer);

    const {insertNode} = useTraverseTree();

    const handleInsertNode =(folderId: Number, item: String, isFolder: boolean) => {
        const finalTree: any = insertNode(explorerData, folderId, item, isFolder)

        setExplorerData(finalTree)
        // fs.writeFile(filepath, JSON.stringify(explorer), function writeJSON(err: Error) {
        //     if (err) return console.log(err);
        //     console.log(JSON.stringify(explorer));
        //     console.log('writing to ' + filepath);
        //   });
    }


    return(
        <div>
            {/* <AddHTMLTags /> */}
            {/* < ShowFiles /> */}
           <Folder handleInsertNode={handleInsertNode} explorer = {explorerData}/>
        </div>
    )
}

export default App;