

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
       

        for(const file of tree.items) {
            if(file.name === 'src') {
                file.items.unshift({
                    id: new Date().getTime(),
                    name: item,
                    isFolder: true,
                    items: []})
            }
        }

        console.log('after', tree.items)


        return { ...tree};

    }





    return { insertNode, deleteNode, createCustomEndpoint };

};

export default useTraverseTree;