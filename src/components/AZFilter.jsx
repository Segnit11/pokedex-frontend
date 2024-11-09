import React, { useState } from "react";
import { Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';

const AZFilter = ({onFilterChange}) => {
    const [filter, setFilter] = useState('nameAsc');
    const handleChange = (newFilter)=>{
        //setFilter(newFilter);
        onFilterChange(newFilter);
    }
    return(
        <Box sx={{minWidth:120}}>
            <FormControl fullWidth>
                <InputLabel id="filter-option-select-label"></InputLabel>
                <Select
                    labelId="filter-option-select-label"
                    id = "filter-option-select"
                    value={filter}
                    onChange={(e)=> handleChange(e.target.value)}
                    label="Sort by"
                >
                    <MenuItem value="nameAsc">Name (Asc)</MenuItem>
                    <MenuItem value="nameDsc">Name (Dsc)</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}
export default AZFilter;
