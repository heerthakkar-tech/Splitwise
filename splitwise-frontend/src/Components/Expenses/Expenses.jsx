import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import API from "../../services/api";

import "../../styles/expenses.css";
import Logout from "../Auth/Logout";
import ExpenseForm from "./ExpenseForm";
import SplitTypeSelector from "./SplitTypeSelector";
import MemberSelector from "./MemberSelector";

function Expenses() {
  const [users, setUsers] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [splitType, setSplitType] = useState("equal");
  const [percentageMembers, setPercentageMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const tokenData = token ? jwtDecode(token) : null;
  const loggedInUserId = tokenData?.id;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await API.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch users");
    }
  };
  //Checks if a friend isn't already selected, then adds them to the selectedMembers list.
  const addMember = (user) => {
    const alreadySelected = selectedMembers.some(
      (member) => member.id === user.id,
    );

    if (!alreadySelected) {
      setSelectedMembers([...selectedMembers, user]);
    }
  };

  //Removes a friend from the selectedMembers list based on their ID.

  const removeMember = (id) => {
    setSelectedMembers(selectedMembers.filter((member) => member.id !== id));
  };

  const addPercentageMember = (user) => {
    const alreadySelected = percentageMembers.some(
      (member) => member.user_id === user.id,
    );

    if (!alreadySelected) {
      setPercentageMembers([
        ...percentageMembers,
        {
          user_id: user.id,
          name: user.name,
          percentage: 0,
        },
      ]);
    }
  };

  //The code strictly prevents users from removing themselves from a percentage split.
  const removePercentageMember = (id) => {
    if (id === loggedInUserId) return;

    setPercentageMembers(
      percentageMembers.filter((member) => member.user_id !== id),
    );
  };

  //specifically takes a user's ID and updates their individual percentage input box.
  const updatePercentage = (id, value) => {
    setPercentageMembers(
      percentageMembers.map((member) =>
        member.user_id === id
          ? { ...member, percentage: Number(value) }
          : member,
      ),
    );
  };
  // A shortcut list of just the IDs of all currently selected friends.
  const activeMembers =
    splitType === "equal"
      ? selectedMembers.map((member) => member.id)
      : percentageMembers.map((member) => member.user_id);

  // prevents to select the loggedin user and the user which is already selected so only give available user in drop down.
  const availableUsers = users.filter(
    (user) => user.id !== loggedInUserId && !activeMembers.includes(user.id),
  );

  //adds up all the custom percentages entered by the user.
  const totalPercentage = percentageMembers.reduce(
    (sum, member) => sum + Number(member.percentage),
    0,
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description || !amount) {
      alert("Please fill all fields");
      return;
    }
    //It gathers the IDs of the selected friends, makes sure the logged-in user is included in the list, and builds the payload (data to send to the server)
    try {
      let payload = {};

      if (splitType === "equal") {
        if (selectedMembers.length === 0) {
          alert("Select members");
          return;
        }

        const memberIds = selectedMembers.map((member) => member.id);

        if (!memberIds.includes(loggedInUserId)) {
          memberIds.push(loggedInUserId);
        }

        payload = {
          description,
          amount: Number(amount),
          split_type: "equal",
          members: memberIds,
        };

        //it ensures the total doesn't exceed 100%. It automatically calculates the logged-in user's percentage ((100 - \text{total custom percentages})) so it balances perfectly, and builds the payload
      } else {
        if (percentageMembers.length === 0) {
          alert("Select members");
          return;
        }

        if (totalPercentage >= 100) {
          alert("Total percentage must be exactly 100%");
          return;
        }

        payload = {
          description,
          amount: Number(amount),
          split_type: "percentage",
          members: [
            ...percentageMembers,
            {
              user_id: loggedInUserId,
              percentage: 100 - totalPercentage,
            },
          ],
        };
      }

      //Sends the built data to the backend /expenses route via a POST request. If it succeeds, it shows a success message and redirects the user to the /dashboard. If it fails, it alerts the user
      await API.post("/expenses", payload);

      alert("Expense added successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Failed to create expense");
    }
  };

  return (
    <div>
      <div className="expense-container">
        <Logout />
        <h1 className="heading">Add Expense</h1>

        {/* The dropdown/buttons used to toggle between "Equal" and "Percentage" splits */}
        <SplitTypeSelector
          splitType={splitType}
          setSplitType={setSplitType}
          setSelectedMembers={setSelectedMembers}
          setShowDropdown={setShowDropdown}
        />

        {/* Wraps the form elements. It passes down the description and amount states, and the handleSubmit function */}
        <ExpenseForm
          description={description}
          setDescription={setDescription}
          amount={amount}
          setAmount={setAmount}
          handleSubmit={handleSubmit}
          navigate={navigate}
        >
          {/* The UI component that renders the friend dropdown, selected friends list, and the percentage inputs. All necessary state and functions are passed down as props. */}
          <MemberSelector
            splitType={splitType}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
            selectedMembers={selectedMembers}
            percentageMembers={percentageMembers}
            loggedInUserId={loggedInUserId}
            availableUsers={availableUsers}
            addMember={addMember}
            removeMember={removeMember}
            addPercentageMember={addPercentageMember}
            removePercentageMember={removePercentageMember}
            updatePercentage={updatePercentage}
            totalPercentage={totalPercentage}
          />
        </ExpenseForm>
      </div>
    </div>
  );
}

export default Expenses;
