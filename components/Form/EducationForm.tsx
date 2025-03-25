import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid2';
import { Input } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/material/styles';


import { useState } from 'react';

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));


export function EducationForm() {
    const [age, setAge] = useState('');
    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };
    return (
        <Grid container spacing={3}>
            {/* 介绍 */}
            <FormGrid size={{ xs: 12 }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <h1 style={{ fontSize: 30, fontWeight: 700 }}>Tell us about your education</h1>
                    <p>Enter your education experience so far, even if you are a current student or did not graduate</p>
                </div>
            </FormGrid>
            {/* School */}
            <FormGrid size={{ xs: 12, md: 6 }}>
                <FormLabel htmlFor="school" required>
                    School
                </FormLabel>
                <Input
                    id="school"
                    name="school"
                    type="school"
                    placeholder="e.g. Hokong University"
                    autoComplete="schoolName"
                    required
                    size="small"
                />
            </FormGrid>
            {/* location */}
            <FormGrid size={{ xs: 12, md: 6 }}>
                <FormLabel htmlFor="location">
                    Location
                </FormLabel>
                <Input
                    id="location"
                    name="location"
                    type="location"
                    placeholder="e.g. Hokong"
                    autoComplete="schoolLocation"
                    size="small"
                />
            </FormGrid>
            {/* degree */}

            <FormGrid size={{ xs: 12, md: 6 }} >
                <FormLabel htmlFor="degree">
                    Degree
                </FormLabel>
                <Select
                    value={age}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value="">
                        <em>Select</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>

            </FormGrid>

        </Grid>
    )
}