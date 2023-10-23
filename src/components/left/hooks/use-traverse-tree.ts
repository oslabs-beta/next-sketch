const useTraverseTree = () => {
  const insertNode = (
    tree: any,
    folderId: number,
    item: string,
    isFolder: boolean,
    preview: string
  ) => {
    if (tree.id === folderId && tree.isFolder) {

      const appFolder = tree.items
      for(const files of appFolder){
        if(files.name === item) {
          alert('Folder name already exists!')
          return a();
        }
      }




      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder,
        items: [],
        preview: '',
      });
      return tree;
    }
    let latestNode = [];
    latestNode = tree.items.map((ob: object) => {
      return insertNode(ob, folderId, item, isFolder, preview);
    });

    return { ...tree, items: latestNode };
  };

  const deleteNode = (tree: any, folderId: number) => {
    const items = tree.items.filter((ob: any) => {
      return ob.id !== folderId;
    });

    if (items.length === tree.items.length) {
      const temp = tree.items.map((obj) => deleteNode(obj, folderId));
      return { ...tree, items: temp };
    }

    return { ...tree, items: items };
  };

    const createCustomEndpoint = (tree: any, folderId: number, item: string, isFolder: boolean ) => {
       let fileAlreadyExists = false;

        if (tree.name === 'app') {

            console.log(tree.items)

            for(const files of tree.items){
                    if(files.name === item) {
                            alert('Folder name already exists!')
                                fileAlreadyExists = true
                                return a();
                        }
                    }


        if(fileAlreadyExists === false){
            tree.items.unshift({
                id: new Date().getTime(),
                name: item,
                isFolder: true,
                items: []

            });
            return tree;
        }
      }
    

    let latestNode = [];
    latestNode = tree.items.map((ob: object) => {
      return createCustomEndpoint(ob, folderId, item, isFolder);
    });

    return { ...tree, items: latestNode };
  
}
  // const retrieveCode =

  const insertBoilerFiles = (
    tree: any,
    folderId: number,
    item: string,
    folderName: string,
    preview: string
  ) => {
    if (tree.name === folderName) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        items: [],
        preview: preview,
      });
      return tree;
    }

    let latestNode = [];
    latestNode = tree.items.map((ob: object) => {
      return insertBoilerFiles(ob, folderId, item, folderName, preview);
    });

    return { ...tree, items: latestNode };
}




  return { insertNode, deleteNode, createCustomEndpoint, insertBoilerFiles };
}

export default useTraverseTree;