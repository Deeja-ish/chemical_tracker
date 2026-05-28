import {render, screen,  fireEvent} from '@testing-library/react'
import App from './App'
import { beforeEach, describe, expect, test } from 'vitest'

describe ('Chemical Solution Tracker App', () => {
    beforeEach(() => {
        // clear local storage
        localStorage.clear()
    })

    test('Before any solution is added to the solution table', () => {
        render(<App />)

        fireEvent.change(screen.getByLabelText(/Solution Name/i), {target: { value: 'H2SO4'}})
        fireEvent.change(screen.getByLabelText(/Solution Concentration/i), {target: {value: '0.1'}})
        fireEvent.change(screen.getByLableText(/Date/i), {target: {value: '2026-04-22'}})

        fireEvent.click(screen.getByText(/Submit/i))

        expect(screen.getByText('H2SO4').toBeInTheDocument)
        expect(screen.getByText('0.1 Mol/L').toBeInTheDocument)

        test('Delete a solution from the table', () => {
            render(<App/>)

            fireEvent.change(screen.getByLabelText(/Solution name/i), {target: {value: 'H2SO4'}})
            fireEvent.change(screen.getByLabelText(/Solution Concentration/i), {target: {value: '0.5'}})

            fireEvent.click(screen.getByText(/Submit/i))

            expect(screen.getByText('H2SO4')).toBeInTheDocument

            // delete a solution
            fireEvent.click(screen.getByText(/Delete/i))

            expect(screen.getByText('H2SO4')).not.toBeInTheDocument
        })

    })
})