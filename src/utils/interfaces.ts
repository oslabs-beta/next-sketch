import { UniqueIdentifier } from '@dnd-kit/core';

export interface Tag {
  id: UniqueIdentifier;
  name: string;
  container: boolean;
  parent?: UniqueIdentifier | undefined | boolean;
  attribute?: string;
  children?: undefined[];
}

export interface modalLayout {
  default: boolean;
  error: boolean;
  layout: boolean;
  loading: boolean;
  notFound: boolean;
  route: boolean;
  template: boolean;
  page: boolean;
}

export interface RenderCodeProps {
  elements: Tag[];
}
