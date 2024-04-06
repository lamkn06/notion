import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getList } from '../../api/list';
import { ItemProps } from '../../components/Item';
import { Items } from '../../components/Items';
import { Popup } from '../../components/PopUp';

const HomePage = () => {
  const [param, setParam] = useState<string>('root');
  const [dataItems, setDataItems] = useState<ItemProps[]>([]);
  const [popup, SetPopup] = useState({
    open: false,
    content: '',
  });

  const { data, isFetching } = useQuery({
    queryKey: ['list', param],
    queryFn: () => getList(param),
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    if (data.id === 'root') {
      return setDataItems(data?.entries || []);
    }

    if (data.contents) {
      return SetPopup({
        open: true,
        content: data.contents,
      });
    }
    try {
      const selected = data.id.split('/').pop();
      const mapEntries = (items: any) => {
        return items.map((item: any) => {
          if (item.name === selected) {
            return {
              ...item,
              child: {
                id: data.id,
                data: data.entries || [],
              },
            };
          }
          if (item.child) {
            return {
              ...item,
              child: {
                id: item.child.id,
                data: mapEntries(item.child.data),
              },
            };
          }
          return item;
        });
      };

      setDataItems((prevDataItems) => mapEntries(prevDataItems));
    } catch (error) {
      console.log(error);
    }
  }, [data, param]);

  const handleOnClick = (item: ItemProps, path: string) => {
    setParam(path);
  };

  return (
    <>
      <Items
        isLoading={isFetching}
        data={dataItems}
        onClick={handleOnClick}
        id={param}
      />
      <Popup
        open={popup.open}
        setOpen={() =>
          SetPopup({
            open: false,
            content: '',
          })
        }
        content={popup.content}
      />
    </>
  );
};

export default HomePage;
