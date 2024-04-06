import { Box, Container, List } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { Item, ItemProps } from '../Item';

export interface ItemsProps {
  isLoading: boolean;
  id: string;
  data: ItemProps[];

  onClick(item: ItemProps, path: string): void;
}

export const Items = (props: ItemsProps): JSX.Element => {
  return (
    <Container disableGutters>
      {props.isLoading ? (
        <CircularProgress />
      ) : (
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >
          {props.data.map((item) => (
            <Box key={item.name}>
              <Item
                name={item.name}
                type={item.type}
                onClick={() => props.onClick(item, item.name)}
              />
              <List
                sx={{
                  width: '100%',
                  maxWidth: 360,
                  bgcolor: 'background.paper',
                }}
              >
                {item.child && (
                  <Box marginLeft={10}>
                    <Items
                      isLoading={props.isLoading}
                      id={item.child.id}
                      data={item.child.data || []}
                      onClick={(item: ItemProps) =>
                        props.onClick(item, `${props.id}/${item.name}`)
                      }
                    />
                  </Box>
                )}
              </List>
            </Box>
          ))}
        </List>
      )}
    </Container>
  );
};
