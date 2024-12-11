import React from 'react'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

import { Controller, type Control, type FieldValues } from 'react-hook-form'

type DatePickerType = {
  control: Control<FieldValues> | undefined | object | any
  name: string
  label: string
  required: boolean
}

export function FilterPicker({ control, name, label, required }: DatePickerType) {
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: required }}
      render={({ field }) => {
        return (
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                value={field.value}
                inputRef={field.ref}
                onChange={date => {
                  field.onChange(date)
                }}
                slotProps={{
                  openPickerIcon: { fontSize: 'small' },
                  openPickerButton: { color: 'secondary' },
                  textField: {
                    variant: 'filled',
                    size: 'small',
                    focused: true,
                    color: 'secondary'
                  }
                }}
                label={label}
              />
            </DemoContainer>
          </LocalizationProvider>
        )
      }}
    />
  )
}
