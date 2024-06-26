import { Box } from "@mui/material";
import MiniDrawer from "./components/Drawer";
import NewsCard from "./components/MarketSummary";
import SectorPerformance from "./components/SectorPerformance";
import MarketDataComponent from "./components/MarketData";
import ChartComponent from "./components/ChartSection";

function App() {
  return (
    <div className="flex justify-center h-screen bg-[#000000] items-center text-center ">
      <MiniDrawer />
      <Box
        sx={{ marginX: "10%", marginTop: { xs: "30%", sm: "20%", md: "12%" } }}
      >
        <Box
          sx={{ display: "flex", flexDirection: ["column", "column", "row"] }}
        >
          <Box
            sx={{
              marginRight: ["0", "0", "10px"],
              marginLeft: ["8.5%", "7.5%", "10px"],
              backgroundColor: "#0b0b0f",
              padding: "2%",
              borderRadius: "10px",
              width: ["100%", "100%", "45%"], 
              marginBottom: ["15px", "15px", "0"], 
            }}
          >
            <NewsCard />
          </Box>
          <Box
            sx={{
              marginLeft: ["7.5%", "7.5%", "10px"],
              backgroundColor: "#0b0b0f",

              width: ["100%", "100%", "55%"], // Adjust width for different screen sizes
            }}
          >
            <SectorPerformance />
          </Box>
        </Box>

        <Box
          sx={{ display: "flex", flexDirection: ["column", "column", "column", "row"], backgroundColor: "#0b0b0f", marginTop: "10%" }}
        >
          <Box sx={{ width: ["100%", "100%", "100%", "40%", ],  marginLeft: ["8.5%", "7.5%", "10px"], }}>
            <MarketDataComponent />
          </Box>
          <Box sx={{  marginLeft: ["8.5%", "7.5%", "10px"], width: ["100%", "100%", "100%", "60%"],  }}>
            <ChartComponent />
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default App;
