import React, { useState, useEffect } from "react";
import { fetchMarketIndices, MarketData } from "../utils/api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";

const MarketDataComponent: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMarketData = async () => {
      try {
        const data = await fetchMarketIndices();
        setMarketData(data);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    getMarketData();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  const getColor = (value: number) => {
    return value > 0 ? "#4caf50" : value < 0 ? "#f44336" : "#ffffff";
  };

  return (
    <Box sx={{ padding: "4%" ,borderRadius: "10px"}}>
      <TableContainer component={Paper} sx={{ backgroundColor: "#0b0b0f" }}>
        <Table
          size="small"
          aria-label="simple table"
          sx={{
            [`& .${tableCellClasses.root}`]: {
              borderBottomColor: "rgba(66, 73, 73, 0.5)",
            },
          }}
        >
          <TableBody>
            {marketData.map((item, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": {
                    backgroundColor: "#333333", // Change background color on hover
                  },
                  borderRadius: "10px",
                }}
              >
                <TableCell component="th" scope="row" sx={{ color: "#ffffff", fontWeight: "bold" }}>
                  {item.Asset}
                </TableCell>
                <TableCell align="right" sx={{ color: "#ffffff" }}>
                  {item.CurrentValue}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: getColor(item.DailyChange) }}
                >
                  {item.DailyChange > 0
                    ? `+${item.DailyChange}`
                    : item.DailyChange}
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    color: getColor(parseFloat(item.PercentageChange)),
                    fontWeight: 600, // Optionally increase font weight for emphasis
                  }}
                >
                  <Box sx={{ backgroundColor: `${getColor(
                      parseFloat(item.PercentageChange)
                    )}22`, 
                    padding: "8px", borderRadius: "10px"}}>
                  {item.PercentageChange > 0 ? `+${item.PercentageChange}%` : `${item.PercentageChange}%`}
                    </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MarketDataComponent;
