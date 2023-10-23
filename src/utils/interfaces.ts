import { UniqueIdentifier } from "@dnd-kit/core";

export interface Tag  {
    id: UniqueIdentifier;
    name: string;
    children: Tag[];
}

export interface Elements {
    [key: string]: Tag;
}