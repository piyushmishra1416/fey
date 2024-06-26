import { Box } from "@mui/material";
import MiniDrawer from "./components/Drawer";
import NewsCard from "./components/MarketSummary";
import SectorPerformance from "./components/SectorPerformance";
import MarketDataComponent from "./components/MarketData";
import ChartComponent from "./components/ChartSection";

function App() {
  return (
    <div className="flex justify-center bg-[#000000] items-center text-center ">
      <MiniDrawer />
      <Box sx={{ marginX: "10%", marginTop: "15%" }}>
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              marginRight: "10px",
              backgroundColor: "#0b0b0f",
              padding: "2%",
              height: "15%",
              borderRadius: "10px",
              width: "45%",
            }}
          >
            <NewsCard />
          </Box>
          <Box
            sx={{
              marginLeft: "10px",
              backgroundColor: "#0b0b0f",
              width: "55%",
            }}
          >
            <SectorPerformance />
          </Box>
        </Box>
        <Box sx={{display: "flex",backgroundColor: "#0b0b0f", marginTop: "10%"}}>
          <Box sx={{width:"40%"}}>
            <MarketDataComponent />
          </Box>
          <Box sx={{marginLeft: "5%"}}>
            <ChartComponent />
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default App;
