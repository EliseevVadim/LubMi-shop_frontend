import Select, { ClearIndicatorProps } from 'react-select';
import { CSSObject } from '@emotion/serialize';

const CitySelect = ({
                      selectedCities,
                      onSelectCity,
                      setSearchCity,
                      cities
                    }: any) => {

  const handleInputChange = (inputValue: string) => {
    setSearchCity(inputValue);
  };

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


  const options = cities?.map((option: any) => ({
    value: option?.uuid?.toString(),
    label: `${option?.city}, ${option?.region}`,
    region: option?.region,
  }));

  const handleChange = (selectedOption: any) => {
    onSelectCity({
      id: selectedOption?.value,
      city: selectedOption?.label.split(', ')[0],
      region: selectedOption?.region,
    });
  };

  return (
   <div className='select-block'>
     <Select
       inputId={'select-city'}
       styles={customStyles}
       placeholder={'Введите Ваш город'}
       value={options?.find((option: any)=> option.value === selectedCities)}
       onChange={handleChange}
       onInputChange={handleInputChange}
       options={options}
       isClearable
       isSearchable
       menuPlacement="auto"
       maxMenuHeight={200}
       noOptionsMessage={() => 'Город не найден'}
     />
   </div>
  );
};

export default CitySelect;
