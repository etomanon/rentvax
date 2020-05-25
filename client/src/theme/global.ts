import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  html {
    font-size: 62.5%;
		width: 100%;
		height: 100%;
  }
  body {
		height: 100%;
		margin: 0;
		padding: 0;
		background: #FCFCFC;
		text-rendering: optimizeLegibility;
		font-family: 'Montserrat', sans-serif;
		-webkit-font-smoothing: antialiased;
		color: ${({ theme }) => theme.colors.text};
		scroll-behavior: smooth;
    font-size: 1.6rem;
		overflow-x: hidden;
  }

	#root {
		display: flex; 
  	flex-direction: column;
	}

	main {
		overflow-x: hidden;
		padding: 0.5rem 0.5rem 5rem 0.5rem;
		@media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    	padding: 5rem 0.5rem 1rem 0.5rem;
  	}
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		line-height: 1;
	}

	ul {
		margin-top: 0;
		margin-bottom: 0;
	}

	button, input, textarea, ::placeholder {
		font-family: 'Montserrat', sans-serif;
	}

	button {
		background: none;
		color: inherit;
		border: none;
		padding: 0;
		cursor: pointer;
		outline: inherit;
		font-size: 1.6rem;
	}

	a {
		text-decoration: none;
		&:hover {
			text-decoration: underline
		}
	}

	.MuiSnackbarContent-message {
		font-family: 'Montserrat', sans-serif;
		font-size: 1.6rem;
		line-height: 1.2;
	}

	.dv-star-rating-star i {
		font-size: 4rem;
	}
`
