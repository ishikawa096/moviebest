import type { CreateListParams, MovieSelectOption } from 'interfaces/interface'
import Image from 'next/image'
import axios from 'axios'
import AsyncCreatableSelect from 'react-select/async-creatable'
import { components, ControlProps, IndicatorsContainerProps, InputProps, SingleValueProps, StylesConfig, ValueContainerProps } from 'react-select'
import { toastWarn } from 'lib/toast'
import { posterUrl } from 'lib/tmdbHelpers'
import { useState } from 'react'

interface Props {
  list: CreateListParams
  cap: number
  onChange: (newValue: MovieSelectOption, i: number) => void
}

const MoviesFormItem = ({ list, cap, onChange }: Props) => {
  const [update, setUpdate] = useState(false)

  const searchMovie = async (inputValue: string) => {
    const res = await axios.get('/api/v1/tmdb/search', { params: { keyword: inputValue } })
    if (res.status === 200) {
      const results = res.data.results
      const movies = results.map((m: any) => ({
        label: m.title,
        value: m.title,
        posterPath: m.posterPath ? m.posterPath : '',
        tmdbId: m.id,
      }))
      return movies
    } else {
      toastWarn('検索できませんでした')
      return []
    }
  }

  const onError = (option: MovieSelectOption) => {
    option.posterPath = ''
    update ? setUpdate(false) : setUpdate(true)
  }

  const FormatOptionLabel = ({ option }: { option: MovieSelectOption }) => (
    <div className='flex items-center justify-center relative m-0 h-[193px] sm:h-[275px] lg:h-[372px]'>
      <Image
        src={(option.label === formatCreateLabel(option.value)) || (!option.posterPath) ? '/342x509.png' : posterUrl(option.posterPath, 'w342')}
        alt={option.label}
        layout='fill'
        objectFit='cover'
        placeholder='blur'
        blurDataURL='/342x509.png'
        onError={() => onError(option)}
      />
      <div className='absolute p-2 md:p-5 text-center whitespace-normal text-white font-extrabold text-shadow'>{option.label}</div>
    </div>
  )

  const placeholder = (
    <div className='flex relative items-center justify-center p-0 m-0 h-[195px] sm:h-[277px] lg:h-[374px]'>
      <div>
        <Image src='/342x509.png' alt='ここに映画のタイトルを入力' width={342} height={509} objectFit='cover' placeholder='blur' blurDataURL='/342x509.png' />
      </div>
      <div className='absolute z-10 text-center'>ここに<br />映画の<br />タイトルを<br />入力</div>
    </div>
  )

  const formatCreateLabel = (inputValue: string) => `"${inputValue}"を選択`

  const SingleValue = ({ children, ...props }: SingleValueProps) => (
    <components.SingleValue {...props} className='h-full w-full p-0'>
      {children}
    </components.SingleValue>
  )

  const ValueContainer = ({ children, ...props }: ValueContainerProps) => (
    <components.ValueContainer {...props} className='w-[130px] sm:w-[185px] lg:w-[250px]'>
      {children}
    </components.ValueContainer>
  )
  const Input = (props: InputProps) => <components.Input {...props} inputClassName='h-[195px] sm:h-[277px] lg:h-[374px] w-[130px] sm:w-[185px] lg:w-[250px] outline-none border-none shadow-none focus:ring-transparent focus:z-10' />

  const Control = ({ children, ...props }: ControlProps) => (
    <components.Control {...props} className='text-xs lg:text-base '>
      {children}
    </components.Control>
  )

  const DropdownIndicator = () => null

  const IndicatorSeparator = () => null

  const LoadingIndicator = () => null

  const IndicatorsContainer = (props: IndicatorsContainerProps) => {
    return (
      <div className='bg-none p-0'>
        <components.IndicatorsContainer {...props} className='hidden' />
      </div>
    )
  }

  const movieFormStyles: StylesConfig = {
    control: (styles, { isFocused }) => {
      return {
        ...styles,
        borderWidth: 4,
        borderStyle: 'dashed',
        boxShadow: 'inherit',
        padding: isFocused ? 10 : 3,
      }
    },
    menu: (styles) => ({ ...styles, zIndex: 300}),
    option: (styles) => {
      return {
        ...styles,
        padding: 5,
        zIndex: 100,
      }
    },
    input: (styles) => ({ ...styles, border: '10px', padding: 0, textAlign: 'center' }),
    singleValue: (styles) => ({ ...styles, padding: 6 }),
    valueContainer: (styles) => ({
      ...styles,
      padding: 0,
      objectFit: 'fill',
    }),
  }

  return (
    <>
      {[...Array(cap)].fill(null).map((_, i) => (
        <div key={i} className='listFormItem m-1 sm:m-3 lg:m-5'>
          <label htmlFor='movie'>
            <strong className='bg-black text-white p-1 pr-10 pl-10 text-center'>{list.movies[i].position + 1}</strong>
            <AsyncCreatableSelect
              loadOptions={searchMovie}
              onChange={(newValue: any) => onChange(newValue, i)}
              placeholder={placeholder}
              formatOptionLabel={(option: MovieSelectOption | any) => <FormatOptionLabel option={option} />}
              formatCreateLabel={formatCreateLabel}
              noOptionsMessage={() => null}
              components={{ Input, Control, SingleValue, ValueContainer, DropdownIndicator, IndicatorSeparator, IndicatorsContainer, LoadingIndicator }}
              styles={movieFormStyles}
              theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary: '#1F2937',
                },
              })}
            />
          </label>
        </div>
      ))}
    </>
  )
}

export default MoviesFormItem
