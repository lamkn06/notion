import { useQuery } from '@tanstack/react-query';
import { SyntheticEvent, useEffect, useState } from 'react';
import { getDirectory, getList } from '../../api/list';
import { ItemProps } from '../../components/Item';
import { Items } from '../../components/Items';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view';

const HomePage = () => {
  const [selected, setSelected] = useState<string>('');
  const [dataItems, setDataItems] = useState<ItemProps[]>([]);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const { data: dataRoot, isFetching: isRootFetching } = useQuery({
    queryKey: ['list'],
    queryFn: () => getList(),
  });

  const { data: dataDirectory, refetch } = useQuery({
    queryKey: ['directory'],
    queryFn: () => getDirectory(selected),
    enabled: !!selected,
  });

  useEffect(() => {
    setDataItems(dataRoot?.entries || []);
  }, [dataRoot]);

  useEffect(() => {
    if (!selected) {
      return;
    }

    refetch();
  }, [selected]);

  useEffect(() => {
    const updateChildItems = (
      items: ItemProps[],
      path: string[],
      childItems: ItemProps[],
    ): ItemProps[] => {
      const [currentPath, ...remainingPath] = path;

      return items.map((item) => {
        if (item.name === currentPath) {
          if (remainingPath.length === 0) {
            return {
              ...item,
              child: childItems,
            };
          } else if (item.child) {
            return {
              ...item,
              child: updateChildItems(item.child, remainingPath, childItems),
            };
          }
        }
        return item;
      });
    };

    setDataItems((prevDataItems) => {
      if (!dataDirectory) {
        return prevDataItems;
      }

      const path = dataDirectory.id.split('/');
      return updateChildItems(prevDataItems, path, dataDirectory.entries || []);
    });
  }, [dataDirectory]);

  const handleOnClick = (item: ItemProps, parent?: ItemProps) => {
    if (item.type === 'directory') {
      const param = parent ? `${parent.name}/${item.name}` : item.name;
      setSelected(param);
      setExpandedItems((prev) => [...prev, param]);
    }
  };

  const handleExpandedItemsChange = (
    event: React.SyntheticEvent,
    itemIds: string[],
  ) => {
    setExpandedItems(itemIds);
  };

  return (
    <SimpleTreeView
      expandedItems={expandedItems}
      onExpandedItemsChange={handleExpandedItemsChange}
    >
      <Items
        isLoading={isRootFetching}
        data={dataItems}
        onClick={handleOnClick}
      />
    </SimpleTreeView>
  );
};

export default HomePage;
