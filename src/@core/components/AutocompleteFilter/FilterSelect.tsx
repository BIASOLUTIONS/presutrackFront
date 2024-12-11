import React from 'react'

import { Autocomplete, TextField } from '@mui/material'
import { Controller, type Control, type FieldValues } from 'react-hook-form'

type AutocompleteType = {
  control: Control<FieldValues>
  name: string
  id: string
  options: Array<{ id: string; name: string }>
  disabled: boolean
  unfilled?: boolean
  required?: boolean
}

export const AutocompleteFilter = React.forwardRef(
  ({ control, name, id, options, disabled, unfilled }: AutocompleteType) => {
    // const errorMessage = control._fields[id]?._f.required

    const [inputValue, setInputValue] = React.useState('')

    React.useEffect(() => {
      if (control._fields[id]?._f.value === null) {
        setInputValue('') //(options.filter(options=>options.id === control._fields[id]?._f.value)[0]?.name || "");
      }
    }, [control._fields, id])

    return (
      <>
        <Controller
          control={control}
          name={id}
          rules={{
            ...(control._fields[id]?._f.required !== undefined && {
              message: control._fields[id]?._f.required,
              required: control._fields[id]?._f.required !== undefined
            })
          }}
          render={({ field, fieldState }) => {
            field.value !== null && setInputValue(options.filter(options => options.id === field.value)[0]?.name || '')

            return (
              <Autocomplete
                freeSolo={true}
                value={field.value?.id || null}
                disabled={disabled}
                inputValue={inputValue}
                onChange={(e, data) => {
                  field.onChange(data.id)
                }}
                onInputChange={(event, newInputValue, reason) => {
                  if (reason === 'clear') {
                    field.onChange(null)
                    setInputValue('')
                  }
                }}
                size='medium'
                id={id}
                options={options?.map((o: { id: string; name: string }) => ({
                  id: o.id,
                  label: o.name.toUpperCase()
                }))}
                renderInput={params => (
                  <TextField
                    {...(!unfilled && { variant: 'filled' })}
                    {...params}
                    error={fieldState.invalid}
                    label={name}
                  />
                )}
              />
            )
          }}
        />
      </>
    )
  }
)
