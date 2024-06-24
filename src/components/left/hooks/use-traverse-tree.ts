import explorer from "../data/folderData";
import { Tag } from "../../../utils/interfaces";

const useTraverseTree = () => {
  const insertNode = (
    tree: typeof explorer,
    folderId: number,
    item: string,
    isFolder: boolean,
    preview?: string
  ): typeof explorer => {
    if (tree.id === folderId && tree.isFolder) {
      for (const files of tree.items) {
        if (files.name.toLowerCase() === item.toLowerCase()) {
          alert('Folder name already exists');
          return a();
        }

        if (tree.name.toLowerCase() === item.toLowerCase()) {
          alert(
            'A nested endpoint should not have the same name as its parent'
          );
          return a();
        }
      }

      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder,
        items: [
          {
            id: new Date().getTime(),
            name: 'page.tsx',
            isFolder: false,
            items: [],
          },
        ],
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

  const deleteNode = (tree: typeof explorer, folderId?: number): typeof explorer => {
    const items = tree.items.filter((ob: any) => {
      return ob.id !== folderId;
    });

    if (items.length === tree.items.length) {
      const temp = tree.items.map((obj: object) => deleteNode(obj, folderId));
      return { ...tree, items: temp };
    }

    return { ...tree, items: items };
  };

  const createCustomEndpoint = (
    tree: typeof explorer,
    folderId: number,
    item: string,
    isFolder?: boolean
  ): typeof explorer | void => {
    let fileAlreadyExists = false;

    if (tree.name === 'app') {
      for (const files of tree.items) {
        if (files.name.toLowerCase() === item.toLowerCase()) {
          alert('Folder name already exists!');
          fileAlreadyExists = true;
          return a();
        }
      }

      if (fileAlreadyExists === false) {
        tree.items.unshift({
          id: new Date().getTime(),
          name: item,
          isFolder: true,
          items: [
            {
              id: new Date().getTime(),
              name: 'page.tsx',
              isFolder: false,
              preview: `
                  import React from 'react';
                    
                    const Page = () => {
                      return (
                        <>
                          {/* Your page content goes here */}
                        </>
                      );
                    };
                    
                    export default Page;
                                `,
              items: [],
            },
          ],
        });
        return tree;
      }
    }

    let latestNode = [];
    latestNode = tree.items.map((ob: object) => {
      return createCustomEndpoint(ob, folderId, item, isFolder);
    });

    return { ...tree, items: latestNode };
  };


  const insertBoilerFiles = (
    tree: typeof explorer,
    folderId: number,
    item: string,
    folderName: string,
    preview?: string,
    parent?: string,
    tags?: Tag[]
  ): typeof explorer | void => {
    if (tree.name === folderName) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        items: [],
        preview: preview,
        parent: folderName,
        tags: tags,
      });
      return tree;
    }

    let latestNode = [];
    latestNode = tree.items.map((ob: object) => {
      return insertBoilerFiles(
        ob,
        folderId,
        item,
        folderName,
        preview,
        parent,
        tags
      );
    });

    return { ...tree, items: latestNode };
  };

  const updatePreview = (
    tree: any,
    fileId: number,

    preview: string,
    tags: Tag[]
  ): typeof explorer | void => {
    if (fileId == tree.id) {
      tree.preview = preview;
      tree.tags = tags;
    }

    let latestNode = [];
    latestNode = tree.items.map((ob: object) => {
      return updatePreview(ob, fileId, preview, tags);
    });

    return { ...tree, items: latestNode };
  };

  const initialPreview = (
    tree: any,
    folderName: string,
    fileName: string,
    preview: string,
    tags: Tag[]
  ): typeof explorer | void => {
    
    if (folderName == tree.parent && fileName == tree.name) {
      tree.preview = preview;
      tree.tags = tags;
    }
    let latestNode = [];
    latestNode = tree.items.map((ob: object) => {
      return initialPreview(ob, folderName, fileName, preview, tags);
    });

    return { ...tree, items: latestNode };
  };

  return {
    insertNode,
    deleteNode,
    createCustomEndpoint,
    insertBoilerFiles,
    updatePreview,
    initialPreview,
  };
};

export default useTraverseTree;
