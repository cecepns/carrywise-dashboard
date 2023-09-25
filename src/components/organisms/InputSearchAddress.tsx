import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Input } from '@/components/molecules';
import { debounce } from 'lodash';

export type AddressApi = {
  osm_id: number;
  display_name: string;
  lon: string;
  lat: string;
};

interface InputSearchAddressProps {
  value?: string;
  label?: string;
  onClickAddress?: (value: AddressApi) => void;
  onChange?: (value: string) => void;
  icon?: React.ReactNode;
}
  
export const InputSearchAddress: React.FC<InputSearchAddressProps> = memo(({
  value,
  label,
  onChange,
  onClickAddress,
}) => {
  const [search, setSearch] = useState<string>('');
  const [showList, setShowList] = useState<boolean>(true);
  const [foundAddresses, setFoundAddresses] = useState<AddressApi[]>([]);

  const selectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setShowList(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickAddress = useCallback(
    (value: AddressApi) => {
      if(onClickAddress) {
        setShowList(false);
        onClickAddress(value);
      }
    }, [onClickAddress]);

  const handleChange = useCallback(
    (value: string) => {
      if(onChange) {
        onChange(value);
      }
    }, [onChange]);

  const searchHandler = useCallback(
    async (directSearch?: string) => {
      try {
        if (directSearch || search.length > 2) {
          setShowList(true);
          setFoundAddresses([]);
          const raw = await fetch(
            `${import.meta.env.VITE_GEOCODING_API}/search?q=${directSearch || search}`,
          );
          const result = await raw.json();
          setFoundAddresses(result);
          if(onClickAddress) {
            onClickAddress(result[0]);
          }
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('[SearchLocationScreen > searchHandler]', err);
      }
    },
    [onClickAddress, search],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchAddressFn = useCallback(
    debounce(val => searchHandler(val), 1000),
    [],
  );

  const fetchResults = useCallback((val:string) => {
    handleChange(val);
    setSearch(val);
    searchAddressFn(val);
  }, [handleChange, searchAddressFn]);

  return (
    <div className="relative w-full">
      <Input label={label} value={value} onChange={fetchResults} />
      {foundAddresses.length > 0 && search.length > 2 && showList && (
        <div className="absolute bg-white z-10 min-h-[50px] max-h-[200px] overflow-y-auto border" ref={selectRef}>
          {foundAddresses.map((item, idx) => (
            <div key={idx} className="py-3 px-5 border-b border-blue-gray-50 cusor-pointer" onClick={()=> handleClickAddress(item)}>
              {item.display_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
  
