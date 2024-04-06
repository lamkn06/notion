import { useEffect, useState } from 'react';
import { getList } from '../../api/list';
import { ItemProps } from '../../components/Item';
import { Items } from '../../components/Items';
import { Popup } from '../../components/PopUp';
import { ItemsResponse } from '../../typings/item';

const HomePage = () => {
  const [param, setParam] = useState<string>('root');
  const [dataResponse, setDataResponse] = useState<ItemsResponse | null>(null);

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [dataItems, setDataItems] = useState<ItemProps[]>([]);
  const [popup, SetPopup] = useState({
    open: false,
    content: '',
  });

  const fetch = async (param: string) => {
    setIsFetching(true);
    try {
      const data = await getList(param);
      setDataResponse(data);
      return data;
    } catch (error) {
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetch(param);
  }, [param]);

  useEffect(() => {
    if (!dataResponse) {
      return;
    }

    if (dataResponse.id === 'root') {
      return setDataItems(dataResponse?.entries || []);
    }

    if (dataResponse.contents) {
      return SetPopup({
        open: true,
        content: dataResponse.contents,
      });
    }

    try {
      const selected = dataResponse.id.split('/').pop();
      const mapEntries = (items: any) => {
        return items.map((item: any) => {
          if (item.name === selected) {
            return {
              ...item,
              child: {
                id: dataResponse.id,
                data: dataResponse.entries || [],
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
  }, [dataResponse, param]);

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
