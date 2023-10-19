import { UniqueIdentifier } from "@dnd-kit/core";

export interface Tag  {
    id: UniqueIdentifier;
    name: string;
}

export interface Elements {
    [key: string]: Tag;
}