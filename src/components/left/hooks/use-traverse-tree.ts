

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

    // const deleteNode = (tree:any, folderId: Number, item: String, isFolder: boolean) => {
    //     if(tree.id === folderId && tree.isFolder){
    //         tree.items.splice(1,1);
    //         return tree;
    //     }
    // }

    // const updateNode = () = {}





    return { insertNode };

};

export default useTraverseTree;