import { FormControl, FormLabel, FormHelperText, Input as InputBase } from '@chakra-ui/react'

export const Input = ({ error, label, touched, ...props}) => (
    
    <FormControl id="name" p={4} isRequired>
        <FormLabel>{ label }</FormLabel>
        <InputBase {...props} />
        {touched && <FormHelperText textColor="#e74c3c">{error}</FormHelperText>}
    </FormControl>
)