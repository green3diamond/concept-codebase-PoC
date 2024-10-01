import { useContext } from 'react'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Box from '@mui/material/Box'
import { AppContext } from './AppContext.tsx'

/**
 * A functional component that renders buttons based on the selected context.
 * It uses the AppContext to access and update shared state.
 * 
 * @returns {JSX.Element} - A JSX element containing the buttons or null if no selection is made.
 */
export default function Buttons() {

    /**
         * Deconstructs the necessary properties from the AppContext.
         * 
         * @type {{ selected: string, sharedState: object, setSharedState: SetStateAction<object> }}
         */
    const { selected, sharedState, setSharedState } = useContext(AppContext)

    /**
    * A function that updates the shared state with the selected button label.
    * 
    * @param {number} buttonLabel - The label of the selected button.
    * @param {string} selected - The selected object.
    */
    const handleClick = (buttonLabel, selected) => {
        setSharedState(sharedState =>
        ({
            ...sharedState,
            [selected]: buttonLabel
        }))
    }

    // Render buttons if a selection is made, otherwise return null
    if (selected !== "")
        return (
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '5%',
                    left: '10%',
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > *': {
                        m: 1,
                    },
                }}
            >
                <ButtonGroup
                    variant="contained"
                    aria-label="Basic button group">
                    <Button onClick={() => handleClick(1, selected)}>Color 1</Button>
                    <Button onClick={() => handleClick(2, selected)}>Color 2</Button>
                </ButtonGroup>
            </Box>
        )
    else return null
}
