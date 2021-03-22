import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Select, { ValueType } from 'react-select';
import { Option } from 'react-select/src/filters';
import { useToasts } from 'react-toast-notifications';
import { useDebouncedCallback } from 'use-debounce/lib';
import { RootState } from '../../Models/RootState';
import { SearchState } from './Models';
import { searchActions } from './SearchSlice';
interface Props {}
function filterOption(option: Option, rawInput: string) {
  const lattLongArray = rawInput.split(',');
  const lattAsFloat = parseFloat(lattLongArray[0]).toFixed(2);
  const longAsFloat = parseFloat(lattLongArray[1]).toFixed(2);
  const isValidLattLong = !isNaN(+lattAsFloat) && !isNaN(+longAsFloat);
  if (isValidLattLong) {
    return true;
  }
  return option.label.toLocaleLowerCase().includes(rawInput.trim().toLocaleLowerCase());
}
function loadingMessage(obj: { inputValue: string }) {
  return `Loading result for ${obj.inputValue}`;
}
const Search: FunctionComponent<Props> = (props) => {
  const { locationOptions, error, errorMessage, loadingData } = useSelector<RootState, SearchState>(
    (state) => state.searchBox,
  );
  const dispatch = useDispatch();
  const fetchLocations = useDebouncedCallback((newValue: string) => {
    dispatch(searchActions.fetchLocations(newValue));
  }, 300);
  const onSelectedOptionChange = (newValue: ValueType<Option, false>) => {
    dispatch(searchActions.selectLocationOption(newValue));
  };
  const { addToast } = useToasts();
  useEffect(() => {
    Object.keys(error).forEach((key) => {
      if (error[key]) {
        addToast(errorMessage, { appearance: 'error' });
      }
    });
    dispatch(searchActions.resetErrorState());
  }, [error, errorMessage]);
  return (
    <Col sm={12} md={6} lg={4} className="mt-3">
      <Select
        filterOption={filterOption}
        name={'City search'}
        placeholder={'Search city'}
        isClearable
        isLoading={loadingData}
        loadingMessage={loadingMessage}
        options={locationOptions}
        onInputChange={fetchLocations}
        onChange={onSelectedOptionChange}
        openMenuOnFocus={false}
        openMenuOnClick={false}
      />
    </Col>
  );
};
export default Search;
