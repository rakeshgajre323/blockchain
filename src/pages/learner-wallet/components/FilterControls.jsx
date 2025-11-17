import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const FilterControls = ({ 
  onFilterChange, 
  onSortChange, 
  currentLanguage = 'en',
  filters = {},
  sortBy = 'date'
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const translations = {
    en: {
      search: 'Search certificates...',
      filters: 'Filters',
      sortBy: 'Sort By',
      institution: 'Institution',
      category: 'Category',
      status: 'Status',
      dateRange: 'Date Range',
      allInstitutions: 'All Institutions',
      allCategories: 'All Categories',
      allStatuses: 'All Statuses',
      newest: 'Newest First',
      oldest: 'Oldest First',
      alphabetical: 'Alphabetical',
      institution_asc: 'Institution A-Z',
      clearFilters: 'Clear All'
    },
    hi: {
      search: 'प्रमाणपत्र खोजें...',
      filters: 'फिल्टर',
      sortBy: 'क्रमबद्ध करें',
      institution: 'संस्थान',
      category: 'श्रेणी',
      status: 'स्थिति',
      dateRange: 'दिनांक सीमा',
      allInstitutions: 'सभी संस्थान',
      allCategories: 'सभी श्रेणियां',
      allStatuses: 'सभी स्थितियां',
      newest: 'नवीनतम पहले',
      oldest: 'पुराने पहले',
      alphabetical: 'वर्णानुक्रम',
      institution_asc: 'संस्थान अ-ज्ञ',
      clearFilters: 'सभी साफ़ करें'
    }
  };

  const t = translations?.[currentLanguage];

  const institutionOptions = [
    { value: '', label: t?.allInstitutions },
    { value: 'iit-delhi', label: 'IIT Delhi' },
    { value: 'iisc-bangalore', label: 'IISc Bangalore' },
    { value: 'nit-trichy', label: 'NIT Trichy' },
    { value: 'skill-india', label: 'Skill India' },
    { value: 'ncvet', label: 'NCVET' }
  ];

  const categoryOptions = [
    { value: '', label: t?.allCategories },
    { value: 'programming', label: currentLanguage === 'en' ? 'Programming' : 'प्रोग्रामिंग' },
    { value: 'data-science', label: currentLanguage === 'en' ? 'Data Science' : 'डेटा साइंस' },
    { value: 'web-development', label: currentLanguage === 'en' ? 'Web Development' : 'वेब डेवलपमेंट' },
    { value: 'digital-marketing', label: currentLanguage === 'en' ? 'Digital Marketing' : 'डिजिटल मार्केटिंग' },
    { value: 'cybersecurity', label: currentLanguage === 'en' ? 'Cybersecurity' : 'साइबर सुरक्षा' }
  ];

  const statusOptions = [
    { value: '', label: t?.allStatuses },
    { value: 'verified', label: currentLanguage === 'en' ? 'Verified' : 'सत्यापित' },
    { value: 'pending', label: currentLanguage === 'en' ? 'Pending' : 'लंबित' },
    { value: 'expired', label: currentLanguage === 'en' ? 'Expired' : 'समाप्त' }
  ];

  const sortOptions = [
    { value: 'date', label: t?.newest },
    { value: 'date_asc', label: t?.oldest },
    { value: 'name', label: t?.alphabetical },
    { value: 'institution', label: t?.institution_asc }
  ];

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchTerm(value);
    onFilterChange({ ...filters, search: value });
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    onFilterChange({});
    onSortChange('date');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <Input
            type="search"
            placeholder={t?.search}
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full"
          />
        </div>

        {/* Sort and Filter Toggle */}
        <div className="flex items-center space-x-2">
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={onSortChange}
            className="w-40"
          />
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName="Filter"
            iconPosition="left"
            iconSize={16}
          >
            {t?.filters}
          </Button>
        </div>
      </div>
      {/* Expanded Filters */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Select
              label={t?.institution}
              options={institutionOptions}
              value={filters?.institution || ''}
              onChange={(value) => handleFilterChange('institution', value)}
            />
            
            <Select
              label={t?.category}
              options={categoryOptions}
              value={filters?.category || ''}
              onChange={(value) => handleFilterChange('category', value)}
            />
            
            <Select
              label={t?.status}
              options={statusOptions}
              value={filters?.status || ''}
              onChange={(value) => handleFilterChange('status', value)}
            />

            <div className="flex items-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                iconName="X"
                iconPosition="left"
                iconSize={16}
                className="w-full"
              >
                {t?.clearFilters}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterControls;