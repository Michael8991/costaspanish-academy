import styled from "./StyledWrapped.module.css";
type StyledWrapperd = {
  onToggle: (value: boolean) => void;
  isOpen: boolean; // agregado
};

export const StyledWrapped = ({ onToggle, isOpen }: StyledWrapperd) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onToggle(e.target.checked);
  };

  return (
    <label htmlFor="check" className={`${styled.menuButton}`}>
      <input
        id="check"
        type="checkbox"
        checked={isOpen} // <-- sincroniza visualmente el toggle
        onChange={handleChange}
      />
      <span className={`${styled.top}`} />
      <span className={`${styled.mid}`} />
      <span className={`${styled.bot}`} />
    </label>
  );
};
