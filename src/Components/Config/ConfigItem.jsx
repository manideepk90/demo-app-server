export default function ConfigItem({
  options = [],
  selectedOption = '',
  handleOnChange = () => {},
}) {
  return (
    <div className="config-item-container">
      <select value={selectedOption} onChange={handleOnChange}>
        <option value="0" disabled>
          Select config
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
