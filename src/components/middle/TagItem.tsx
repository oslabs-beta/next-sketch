import { Typography } from '@mui/material';
import { Tag } from '../../types';

interface TagItemProps {
  tag: Tag;
}

export const TagItem = ({ tag }: TagItemProps): JSX.Element => {
  return <Typography>{tag.name}</Typography>;
};
