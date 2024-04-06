import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Box, ListItemAvatar, ListItemText } from '@mui/material';
import { ItemType } from '../../typings/item';

export interface ItemProps {
  name: string;
  type: ItemType;

  child?: ItemProps[];
}

const Icon = (props: { type: ItemType }): JSX.Element => {
  switch (props.type) {
    case 'directory':
      return <DriveFileMoveIcon />;
    case 'file':
      return <InsertDriveFileIcon />;
    default:
      return <></>;
  }
};

export const Item = (props: ItemProps): JSX.Element => {
  return (
    <Box display={'flex'}>
      <ListItemAvatar>
        <Icon type={props.type} />
      </ListItemAvatar>
      <ListItemText primary={props.name} secondary={props.type} />
    </Box>
  );
};
