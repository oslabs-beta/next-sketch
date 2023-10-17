

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
        console.log('in delete')
      


         const items = tree.items.filter((ob) => {
                console.log('ob.id', ob.id)
                return ob.id !== folderId
            })
    
    
        console.log('final', items)
        let latestNode = [];
        latestNode = tree.items.map((ob: object) => {
            return deleteNode(ob, folderId);
        });

        return { ...tree, items: items };
    }

    // const updateNode = () = {}





    return { insertNode, deleteNode };

};

export default useTraverseTree;