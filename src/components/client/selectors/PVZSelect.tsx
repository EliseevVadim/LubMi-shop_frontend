import Select from 'react-select';

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

  const options = searchPVSData?.map((option: any) => ({
    value: option?.code?.toString(),
    label: option?.location?.address
  }));

  // Обработчик изменений
  const handleChange = (selectedOption: any) => {
    onSelectPVS({ id: selectedOption?.value } as any);
  };

  // Обработчик поиска
  const handleInputChange = (inputValue: string) => {
    setSearchPVS(inputValue);
  };

  return (
    <div className='select-block'>
      <Select
        styles={customStyles}
        placeholder={'Выберите ПВЗ'}
        value={options?.find((option: any) => option.value === selectedPVS)}
        onChange={handleChange}
        onInputChange={handleInputChange}
        options={options}
        isSearchable
        menuPlacement="auto"
        maxMenuHeight={200}
        noOptionsMessage={() => 'ПВЗ не найден'}
        isClearable
      />
    </div>
  );
};

export default PVZSelect;
