import styled from 'styled-components'

export const Checkbox = styled.input.attrs(() => ({
  type: 'checkbox',
}))`
  display: none;
`

export const CheckboxLabel = styled.label`
  position: relative;
  cursor: pointer;
  padding-left: 2.2rem;
  &:focus {
    outline: none;
  }
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    left: 0;
    width: 2rem;
    height: 2rem;
    border: 2px solid #ccc;
    background: #fff;
    border-radius: 4px;
    transition: all 0.2s ease-in;
  }
  &:after {
    content: '✕';
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    left: 1px;
    font-size: 2.1rem;
    color: ${({ theme }) => theme.colors.primary};
    transition: all 0.2s ease-in;
  }
  ${/*sc-selector*/ Checkbox}:not(:checked) + & {
    &:after {
      opacity: 0;
    }
  }
  ${/*sc-selector*/ Checkbox}:checked + & {
    &:after {
      opacity: 1;
    }
    &:before {
      border: 1px solid transparent;
    }
  }
  ${/*sc-selector*/ Checkbox}:focus + & {
    &:before {
      border: 1px dotted ${({ theme }) => theme.colors.primary};
    }
  }
`
