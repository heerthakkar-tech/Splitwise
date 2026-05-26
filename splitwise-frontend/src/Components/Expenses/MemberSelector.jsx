function MemberSelector({
  splitType,
  showDropdown,
  setShowDropdown,
  selectedMembers,
  percentageMembers,
  loggedInUserId,
  availableUsers,
  addMember,
  removeMember,
  addPercentageMember,
  removePercentageMember,
  updatePercentage,
  totalPercentage,
}) {
  return (
    <>
      <div className="member-selector">
        <div
          className="selected-members-box"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {splitType === "equal" ? (
            selectedMembers.length === 0 ? (
              <span>Select members...</span>
            ) : (
              selectedMembers.map((member) => (
                <div key={member.id} className="member-pill">
                  {member.name}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeMember(member.id);
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))
            )
          ) : percentageMembers.length === 0 ? (
            <span>Select members...</span>
          ) : (
            percentageMembers.map((member) => (
              <div key={member.user_id} className="member-pill">
                <span>{member.name}</span>

                <input
                  type="number"
                  placeholder="%"
                  value={member.percentage}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) =>
                    updatePercentage(member.user_id, e.target.value)
                  }
                  style={{
                    width: "60px",
                    marginLeft: "10px",
                  }}
                />

                {member.user_id !== loggedInUserId && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removePercentageMember(member.user_id);
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        {showDropdown && (
          <div className="dropdown-box">
            {availableUsers.map((user) => (
              <button
                type="button"
                key={user.id}
                className="dropdown-item"
                onClick={() =>
                  splitType === "equal"
                    ? addMember(user)
                    : addPercentageMember(user)
                }
              >
                {user.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {splitType === "percentage" && (
        <p>
          Others: <strong>{totalPercentage}%</strong>
          <br />
          Your Share: <strong>{100 - totalPercentage}%</strong>
        </p>
      )}
    </>
  );
}

export default MemberSelector;
