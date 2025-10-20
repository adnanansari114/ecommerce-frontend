import React, { createContext, useState } from 'react';

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    minPrice: '',
    maxPrice: '',
    color: '',
    minRating: '',
    search: ''
  });
  const [filterCount, setFilterCount] = useState(0);

  const updateFilters = (newFilters) => {
    let count = 0;
    if (newFilters.category) count++;
    if (newFilters.priceRange) count++;
    if (newFilters.color) count++;
    if (newFilters.minRating) count++;
    if (newFilters.search) count++;
    setFilterCount(count);
    setFilters(newFilters);
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      priceRange: '',
      minPrice: '',
      maxPrice: '',
      color: '',
      minRating: '',
      search: ''
    });
    setFilterCount(0);
  };

  return (
    <FilterContext.Provider value={{ filters, updateFilters, resetFilters, filterCount }}>
      {children}
    </FilterContext.Provider>
  );
};