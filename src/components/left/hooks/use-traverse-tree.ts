

const useTraverseTree = () => {
    function insertNode(tree: any, folderId: number, item: string, isFolder: boolean) {
        if (tree.id === folderId && tree.isFolder) {
            tree.items.unshift({
                id: new Date().getTime(),
                name: item,
                isFolder,
                items: []

            });
            return tree;
        }
        let latestNode = [];
        latestNode = tree.items.map((ob: object) => {
            return insertNode(ob, folderId, item, isFolder);
        });

        return { ...tree, items: latestNode };
    }

    const deleteNode = (tree:any, folderId: Number) => {
      


         const items = tree.items.filter((ob: any) => {
                return ob.id !== folderId
            })
    
    
            if (items.length === tree.items.length) {
                const temp = tree.items.map((obj) => deleteNode(obj, folderId));
                return { ...tree, items: temp };
              }

        return { ...tree, items: items };
    }

    const createCustomEndpoint = (tree: any, folderId: number, item: string, isFolder: boolean ) => {
       let fileAlreadyExists = false;


       //loop through files of source folder and make sure there are not 2 folders with the same name
        for(const folder of tree.items) {
            if(folder.name === 'src') {

                for(const files of folder.items){
                    if(files.name === item) {
                        alert('Folder name already exists!')
                        fileAlreadyExists = true
                }
            }

            if(fileAlreadyExists === false){
                folder.items.unshift({
                    id: new Date().getTime(),
                    name: item,
                    isFolder: true,
                    items: []})
                
                }
            }
        }


        return { ...tree};

    }

    function insertBoilerFiles(tree: any, folderId: number, item: string, folderName: string) {
      


        if (tree.name === folderName) {
            tree.items.unshift({
                id: new Date().getTime(),
                name: item,
                items: []

            });
            return tree;
        }

        let latestNode = [];
        latestNode = tree.items.map((ob: object) => {
            return insertBoilerFiles(ob, folderId, item, folderName);
        });

        return { ...tree, items: latestNode };


    }





    return { insertNode, deleteNode, createCustomEndpoint, insertBoilerFiles };

};

export default useTraverseTree;