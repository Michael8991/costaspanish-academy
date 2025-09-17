import styled from './StyledWrapped.module.css'

type StyledWrapperd = { onToggle: (value: boolean) => void }
export const StyledWrapped = ({ onToggle }: StyledWrapperd) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onToggle(e.target.checked) // enviamos true/false al padre
    }

    return (
        <label htmlFor="check" className={`${styled.menuButton}`}>
            <input id="check" type="checkbox" onChange={handleChange} />
            <span className={`${styled.top}`} />
            <span className={`${styled.mid}`} />
            <span className={`${styled.bot}`} />
        </label>
    )
}
