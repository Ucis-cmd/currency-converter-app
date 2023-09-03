import React, { useState } from "react";
import Select from "react-select";
import currencyInfoMap from "currency-info-map/map";

const currencyInput = ({
  currencyNames,
  amount,
  defaultValue,
  onSelect,
  onChange,
  readOnly,
}) => {
  const currencyOptions = currencyNames
    ? currencyNames.map((name) => ({
        value: name,
        label: (
          <div className="flex gap-2 items-center">
            <span
              className={`currency-flag currency-flag-${name.toLowerCase()}`}
            />
            {name} - {currencyInfoMap[name].name}
          </div>
        ),
      }))
    : null;

  const selectStyles = {
    menu: (provided) => ({
      ...provided,
      width: "300px",
    }),
    input: (provided) => ({
      ...provided,
      padding: "0.5rem",
      margin: "0",
    }),
    container: (provided) => ({
      ...provided,
      width: "400px",
      borderRight: "2px solid rgb(229, 231, 235)",
    }),
    control: (provided) => ({
      ...provided,
      border: "none",
      borderRadius: 0,
    }),
  };

  const selectHandler = (e) => {
    onSelect(e.value);
  };

  const inputChangeHandler = (e) => {
    onChange(e.target.value);
  };

  const defaultOption = currencyOptions
    ? currencyOptions.find((option) => option.value === defaultValue)
    : "s";

  return (
    <div className="flex items-center border-2 border-gray-200 rounded-md w-fit">
      <form>
        <Select
          isSearchable={true}
          options={currencyOptions}
          className="basic-single border-none inline-block rounded-none focus:outline-none"
          onChange={selectHandler}
          styles={selectStyles}
          isDisabled={!currencyOptions}
          value={defaultOption}
        />
        <input
          type="number"
          onChange={inputChangeHandler}
          step="none"
          defaultValue={amount}
          className="p-2 focus:outline-none rounded-r-md"
          readOnly={readOnly}
        />
      </form>
    </div>
  );
};

export default currencyInput;
