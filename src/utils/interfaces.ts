import { UniqueIdentifier } from "@dnd-kit/core";

export interface Tag  {
    id: UniqueIdentifier;
    name: string;
    container: boolean;
    parent?: UniqueIdentifier | undefined | boolean;
}

export interface Elements {
    [key: string]: Tag;
}