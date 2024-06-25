import { UniqueIdentifier } from "@dnd-kit/core";
import explorer from '../components/left/data/folderData';
import React, { SetStateAction } from "react";

export interface Tag  {
    id: UniqueIdentifier;
    name: string;
    container: boolean;
    parent?: UniqueIdentifier | undefined | boolean;
    attribute?: string
}

export interface Elements {
    [key: string]: Tag;
}


export interface ContextTypes {
    tags: Tag[],
  }

 export interface ComponentNameType {
    componentName: string;
    setComponentName: React.Dispatch<SetStateAction<string>>;
  }
  
  export interface CodeSnippetType {
    codeSnippet: string;
    setCodeSnippet: React.Dispatch<SetStateAction<string>>;
  }


export interface FolderProps{
    handleInsertNode: (folderId: number, item: string, isFolder: boolean, preview?: string) => void, 
    handleDeleteNode: (folderId?: number) => void,
    handleInputBoilerFiles: (folderId: number, item: string, folderName: string, preview?: string) => typeof explorer | void,
    explorer: typeof explorer,
    setFolder: React.Dispatch<SetStateAction<string>>,
    folder: string
    setFile: React.Dispatch<SetStateAction<string>>,
    file: string,
    setPostData: React.Dispatch<SetStateAction<boolean>>,
    postData: boolean
  }

  export interface CustomEndpointProps{
    handleCreateCustomEndpoint: (folderId: number, item: string, isFolder?: boolean) => typeof explorer | void,
    handleInputBoilerFiles: (folderId: number, item: string, folderName: string, preview?: string) => typeof explorer | void,
    handleUpdatePreview: (fileId: number, preview: string, tags: Tag[]) => typeof explorer | void,
    handleInitialPreview: (folderName: string, fileName: string, preview: string, tags: Tag[]) => typeof explorer | void,
    explorer: typeof explorer,
    setFolder: React.Dispatch<SetStateAction<string>>,
    folder: string
    setFile: React.Dispatch<SetStateAction<string>>,
    file: string,
    setPostData: React.Dispatch<SetStateAction<boolean>>,
    postData: boolean
  }

  export interface Input {
    visible: boolean | undefined | null;
    isFolder: boolean | undefined | null;
  }
  

export interface modalLayout {
    default: boolean;
    error: boolean;
    layout: boolean;
    loading: boolean;
    notFound: boolean;
    route: boolean;
    template: boolean;
    page: boolean
}

export interface RenderCodeProps {
    elements: Tag[];
}
