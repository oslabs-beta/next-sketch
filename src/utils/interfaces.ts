import { UniqueIdentifier } from "@dnd-kit/core";

export interface Tag  {
    id: UniqueIdentifier;
    name: string;
}

export interface Elements {
    [key: string]: Tag;
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
  