import Select from 'react-select';
import {$bucket} from "@/entety/client/bucket/model";
import {useUnit} from "effector-react/effector-react.umd";
import {useEffect} from "react";

const PVZSelect = ({
                     selectedPVS,
                     onSelectPVS,
                     setSearchPVS,
                     searchPVSData
                      }: any) => {



  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      borderRadius: 0,
      borderBottom: 0,
      margin: 0,
      padding: 0,
      border: 'none',
      borderColor: 'rgba(34, 34, 34, 1)',
      boxShadow: 'none',
      '&:hover': {
        borderColor: 'rgba(34, 34, 34, 1)',
      },
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      minWidth: 0,
      fontFamily: 'Geologica, sans-serif',
    }),
    input: (provided: any) => ({
      ...provided,
      margin: 0,
      padding: 0,
      minWidth: 0,
      whiteSpace: 'nowrap',
      fontFamily: 'Geologica, sans-serif'
    }),
    placeholder: (provided: any) => ({
      ...provided,
      margin: 0,
      padding: 0,
      minWidth: 0,
      fontWeight: 500
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    }),
    dropdownIndicator: () => ({
      display: 'none',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    menu: (provided: any) => ({
      ...provided,
      borderRadius: 0,
      border: 'none',
      borderColor: 'rgba(34, 34, 34, 1)',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      '&:hover': {
        backgroundColor: 'rgba(34, 34, 34, 0.1)',
      },
      backgroundColor: state.isFocused ? 'rgba(34, 34, 34, 0.1)' : 'transparent',
      color: 'rgba(34, 34, 34, 1)',
    }),
    container: (provided: any) => ({
      ...provided,
      width: '100%',
    }),
  };

  const [bucket] = useUnit([$bucket])

  const totalWeight = bucket?.reduce((sum, item) => sum + item?.actual_weight * item?.quantity, 0);
  const options = searchPVSData
    ?.filter((item: any) => item?.weight_max && Number(item?.weight_max) * 1000 >= totalWeight)
    ?.map((option: any) => ({
    value: option?.code?.toString(),
    label: option?.location?.address,
      weight_max: option?.weight_max
  }));

  console.log('totalWeight: ' + totalWeight)

  // Обработчик изменений
  const handleChange = (selectedOption: any) => {
    onSelectPVS({ id: selectedOption?.value } as any);
  };

  // Обработчик поиска
  const handleInputChange = (inputValue: string) => {
    setSearchPVS(inputValue);
  };

  const selectedValue = options?.find((option: any) => option.value === selectedPVS?.id) || null

  useEffect(() => {
    if (options?.length === 0 ){
      onSelectPVS(null)
    }
  }, [options]);

  return (
    <div className='select-block'>
      <Select
        styles={customStyles}
        placeholder={'Выберите ПВЗ'}
        value={selectedValue}
        onChange={handleChange}
        onInputChange={handleInputChange}
        options={options}
        isSearchable
        menuPlacement="auto"
        maxMenuHeight={200}
        noOptionsMessage={() => 'ПВЗ не найден или же максимальный вес товаров привешает допустимый верхний предел'}
        isClearable
      />
    </div>
  );
};

export default PVZSelect;
