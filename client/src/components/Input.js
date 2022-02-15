import { FormControl, InputLabel, OutlinedInput } from '@mui/material'

const Input = ({
	name,
	id,
	value,
	text,
	handleChange,
	endAdornment,
	inputProps = {},
	style = { marginBottom: '20px', width: '100%' },
	variant = 'outlined',
}) => {
	return (
		<FormControl sx={style} variant={variant}>
			<InputLabel htmlFor={id} sx={{ color: 'white' }}>
				{text}
			</InputLabel>
			<OutlinedInput
				sx={{ color: 'white', '& fieldset': { borderColor: 'white' } }}
				id={id}
				value={value}
				name={name}
				onChange={handleChange}
				endAdornment={endAdornment}
				label={name}
				inputProps={inputProps}
			/>
		</FormControl>
	)
}

export default Input
