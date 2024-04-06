import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { ItemType } from '../../typings/item';
import { ItemsProps } from '../Items';

export interface ItemProps {
  name: string;
  type: ItemType;

  child?: ItemsProps;
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

export const Item = (props: ItemProps & { onClick(): void }): JSX.Element => {
  return (
    <ListItemButton onClick={props.onClick}>
      <ListItemAvatar>
        <Icon type={props.type} />
      </ListItemAvatar>
      <ListItemText primary={props.name} secondary={props.type} />
    </ListItemButton>
  );
};
