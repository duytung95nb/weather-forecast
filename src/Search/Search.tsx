import { FunctionComponent, useState } from 'react';
import Select, { ValueType } from 'react-select';

interface Props {}
const Search: FunctionComponent<Props> = (props) => {
    const [locations, setLocations] = useState<Location[]>([]);
    const onInputChange = (newValue: string) => {
        console.log(newValue);
    };
    const onSelectedOptionChange = (newValue: ValueType<Location, false>) => {
        console.log(newValue);
    };
    return (
        <Select
            name={'City search'}
            placeholder={'Type to search city'}
            options={locations}
            onInputChange={onInputChange}
            onChange={onSelectedOptionChange}
        />
    );
};
export default Search;
