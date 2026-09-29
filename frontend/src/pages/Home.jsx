import { useOutletContext,useNavigate} from "react-router";

function Home() {
  const { user } = useOutletContext();
  const navigate = useNavigate();

  function handleLogout() { 
    
    localStorage.removeItem("token");
    localStorage.removeItem("user"); 
    
    navigate("/login", { replace: true }); }

  return (
    <div>
      <h1>
        Welcome, {user.firstName}
      </h1>

      <p>
        @{user.username}
      </p>


      <button onClick={handleLogout}> Logout </button>
    </div>
  );
}

export default Home;