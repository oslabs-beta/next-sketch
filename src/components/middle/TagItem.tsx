import { Typography } from '@mui/material';
import { Tag } from '../../utils/interfaces';

interface TagItemProps {
  tag: Tag;
}

export const TagItem = ({ tag }: TagItemProps): JSX.Element => {
  return (
    <Typography variant='h6' sx={{ textAlign: 'center' }}>
      {tag.name.toUpperCase()}
    </Typography>
  );
};
