"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./Dropdown.module.scss";

export interface DropdownOption<T> {
  value: T;
  label: string;
}

interface DropdownProps<T> {
  options: DropdownOption<T>[];
  selectedValue?: T;
  onSelect?: (value: T) => void;
  placeholder?: string;
  className?: string;
  renderOption?: (option: DropdownOption<T>) => React.ReactNode;
  renderSelected?: (option: DropdownOption<T>) => React.ReactNode;
  isDisabled?: boolean;
}

function Dropdown<T = string>({
  options,
  selectedValue,
  onSelect,
  placeholder = "선택하세요",
  className = "",
  renderOption,
  renderSelected,
  isDisabled = false,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<T | undefined>(selectedValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelected(selectedValue);
  }, [selectedValue]);

  const handleSelect = (value: T) => {
    setSelected(value);
    onSelect?.(value);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    if (!isDisabled) {
      setIsOpen(!isOpen);
    }
  };

  const selectedOption = options.find((opt) => opt.value === selected);

  const defaultRenderOption = (option: DropdownOption<T>) => option.label;
  const defaultRenderSelected = (option: DropdownOption<T>) => option.label;

  return (
    <div
      className={`${styles.dropdown} ${className} ${isDisabled ? styles.disabled : ""} ${isOpen ? styles.open : ""}`}
      ref={dropdownRef}
    >
      <div
        className={styles.dropdownHeader}
        onClick={toggleDropdown}
      >
        <span className={styles.headerText}>
          {selectedOption
            ? renderSelected
              ? renderSelected(selectedOption)
              : defaultRenderSelected(selectedOption)
            : placeholder}
        </span>
        <span className={`${styles.chevron} ${isOpen ? styles.chevronUp : styles.chevronDown}`}>
          ▼
        </span>
      </div>

      {isOpen && (
        <div className={styles.dropdownContent}>
          {options.map((option, index) => (
            <div
              key={index}
              className={`${styles.dropdownOption} ${selected === option.value ? styles.selected : ""}`}
              onClick={() => handleSelect(option.value)}
            >
              {renderOption ? renderOption(option) : defaultRenderOption(option)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
