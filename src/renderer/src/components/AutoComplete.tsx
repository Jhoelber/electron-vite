import Autocomplete from '@mui/material/AutoComplete';
import TextField from '@mui/material/TextField';

import { OcupacoesData } from '../data/OcupacoesData';
const AutoComplete = () => {

    return (
        <div>

            <Autocomplete
                disablePortal
                disableClearable
                id="combo-box-demo"
                options={OcupacoesData.map(e => e.Ocupação)}
                sx={{

                    width: 320
                }}
                selectOnFocus={false}
                noOptionsText={'Ocupação nao encontrada'}
                renderInput={(params) =>
                    <TextField {...params} id="filled-search" label="Ocupação" type='search' variant='standard' required />}

            />

         

        </div>
    )


}
export default AutoComplete;