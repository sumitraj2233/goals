import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GoalForm } from "../components/GoalForm";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { getGoals, reset } from "../features/goals/goalSlice";
import GoalItem from "../components/GoalItem";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { goals, isError, isLoading, message } = useSelector(
    (state) => state.goals
  );
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }
    dispatch(getGoals());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals dashboard</p>
      </section>
      <GoalForm />
      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((single) => (
              <GoalItem key={single._id} goal={single} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
