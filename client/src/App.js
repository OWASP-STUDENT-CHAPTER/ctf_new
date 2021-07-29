import "./App.css";
import Leaderboard from "./Components/Leaderboard/leaderboard";
import Rounds from "./Components/Rounds/rounds";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useQueryClient, QueryClient, QueryClientProvider } from "react-query";
import Transition from "./Pages/Transition";
import End from "./Pages/End";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Switch>
            <Route path="/" exact>
              <Login />
            </Route>
            <Route path="/dashboard" exact>
              <Dashboard />
            </Route>
            <Route path="/leaderboard">
              <Leaderboard />
            </Route>
            <Route path="/game">
              <Transition />
            </Route>
            <Route path="/end">
              <End />
            </Route>
          </Switch>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
