import { nanoid } from 'nanoid';
import { Div, Input } from './Filter.styled';
import PropTypes from 'prop-types';

const filterInputId = nanoid();

const Filter = ({ filter, onChangeFilter }) => (
  <Div>
    <label htmlFor={filterInputId}>Find contacts by name</label>
    <Input
      type="text"
      id={filterInputId}
      value={filter}
      onChange={onChangeFilter}
    />
  </Div>
);

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};

export default Filter;
