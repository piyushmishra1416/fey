import React, { useEffect, useState } from "react";
import { fetchSectorPerformance, SectorPerformanceData } from "../utils/api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Grid,
  useTheme,
  tableCellClasses,
} from "@mui/material";

const SectorPerformance: React.FC = () => {
  const [sectorData, setSectorData] = useState<SectorPerformanceData[] | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchSectorPerformance();
        setSectorData(response);
      } catch (error) {
        console.error("Error fetching sector performance:", error);
      }
    };
    fetchData();
  }, []);

  const theme = useTheme();

  if (!sectorData) {
    return null;
  }

  const netPriceChange = sectorData
    .reduce((total, sector) => {
      const change = parseFloat(sector.changesPercentage.replace("%", ""));
      return total + change;
    }, 0)
    .toFixed(2);

  const firstHalf = sectorData.slice(0, 5);
  const secondHalf = sectorData.slice(5);

  const createGradient = (isNegative: boolean) => {
    const color = isNegative
      ? theme.palette.error.main
      : theme.palette.success.main;
    const lightColor = `${color}22`;
    return `linear-gradient(to right, transparent 65%, ${lightColor} 100%)`;
  };

  return (
    <Box
      sx={{
        backgroundColor: "#0b0b0f",
        color: "white",
        p: 4,
        borderRadius: 2,
        maxWidth: "800px",
        mx: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: 4,
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{ fontWeight: "bold" }}
          gutterBottom
        >
          Sector Performance
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#959595",
            opacity: 0.4,
            marginLeft: "auto",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          % price change
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TableContainer
            component={Paper}
            sx={{ backgroundColor: theme.palette.grey[900], width: "100%" }}
          >
            <Table
              sx={{
                backgroundColor: "#0b0b0f",
                [`& .${tableCellClasses.root}`]: {
                  borderBottomColor: "rgba(66, 73, 73, 0.5)",
                },
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    All sectors
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    {parseFloat(netPriceChange) > 0 ? "+" : ""}
                    {netPriceChange}%
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {firstHalf.map((sector) => (
                  <TableRow
                    key={sector.sector}
                    sx={{
                      background: createGradient(
                        sector.changesPercentage.includes("-")
                      ),
                    }}
                  >
                    <TableCell sx={{ color: "#959595" }}>
                      {sector.sector}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        color: sector.changesPercentage.includes("-")
                          ? theme.palette.error.main
                          : theme.palette.success.main,
                      }}
                    >
                      {sector.changesPercentage}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TableContainer
            component={Paper}
            sx={{ backgroundColor: "#0b0b0f", width: "100%" }}
          >
            <Table
              sx={{
                [`& .${tableCellClasses.root}`]: {
                  borderBottomColor: "rgba(66, 73, 73, 0.5)",
                },
              }}
            >
              <TableBody>
                {secondHalf.map((sector) => (
                  <TableRow
                    key={sector.sector}
                    sx={{
                      background: createGradient(
                        sector.changesPercentage.includes("-")
                      ),
                    }}
                  >
                    <TableCell sx={{ color: "#959595" }}>
                      {sector.sector}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        color: sector.changesPercentage.includes("-")
                          ? theme.palette.error.main
                          : theme.palette.success.main,
                      }}
                    >
                      {sector.changesPercentage}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SectorPerformance;
