import { Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { TreeItem } from '@mui/x-tree-view';
import { ItemProps } from '../Item';

interface ItemsProps {
  isLoading: boolean;
  data: ItemProps[];
  parent?: ItemProps;

  onClick(item: ItemProps, parent?: ItemProps): void;
}

export const Items = (props: ItemsProps): JSX.Element => {
  return (
    <Container disableGutters>
      {props.isLoading ? (
        <CircularProgress />
      ) : (
        <>
          {props.data.map((item) => {
            console.log(
              props.parent ? `${props.parent.name}/${item.name}` : item.name,
            );
            return (
              <TreeItem
                itemId={
                  props.parent ? `${props.parent.name}/${item.name}` : item.name
                }
                label={item.name}
                key={item.name}
                onClick={() => props.onClick(item, props.parent)}
              >
                {item.child && (
                  <Items
                    isLoading={false}
                    data={item.child}
                    parent={item}
                    onClick={props.onClick}
                  />
                )}
              </TreeItem>
            );
          })}
        </>
      )}
    </Container>
  );
};
