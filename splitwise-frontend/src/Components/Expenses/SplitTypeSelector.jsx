function SplitTypeSelector({
  splitType,
  setSplitType,
  setSelectedMembers,
  setShowDropdown,
}) {
  return (
    <div>
      <h3>Split Type</h3>
      <br></br>

      <label>
        <input
          type="radio"
          value="equal"
          checked={splitType === "equal"}
          onChange={(e) => {
            setSplitType(e.target.value);
            setSelectedMembers([]);
            setShowDropdown(false);
          }}
        />
        Equal Split
      </label>

      <label style={{ marginLeft: "20px" }}>
        <input
          type="radio"
          value="percentage"
          checked={splitType === "percentage"}
          onChange={(e) => {
            setSplitType(e.target.value);
            setSelectedMembers([]);
            setShowDropdown(false);
          }}
        />
        Percentage Split
      </label>

      <br></br>
      <br></br>
    </div>
  );
}

export default SplitTypeSelector;
