import {
  Box,
  Paper,
  Tab,
  Tabs,
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardActionArea,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { useState } from "react";
import "./index.css";

const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box className="tabpanel-container" p={3}>
          {children}
        </Box>
      )}
    </div>
  );
};

const DisplayMenu = ({
  menu,
  categoryOptions,
  setOpenModal,
  setEditMenu,
  setInputField,
}) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleCardSelect = (item) => {
    let finalItem = item;
    finalItem.additionalOption = Object.values(item.additionalOption);

    setOpenModal(true);
    setEditMenu(true);
    setInputField({ ...finalItem });
  };

  return (
    <Box width={1} height={1} padding={2}>
      <Paper elevation={4} sx={{ backgroundColor: blue[100] }}>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          {categoryOptions.map((category, index) => (
            <Tab key={category} label={category}></Tab>
          ))}
        </Tabs>
        {categoryOptions.map((category, index) => (
          <TabPanel
            key={`${category}-${index}`}
            value={selectedTab}
            index={index}
          >
            {Object.values(menu[category])?.map((item, idx) => (
              <Card
                key={`card-${idx}`}
                raised
                sx={{
                  display: "flex",
                  backgroundColor: "",
                  maxWidth: 345,
                  minWidth: 200,
                  flexBasis: 180,
                  flex: 1,
                }}
              >
                <CardActionArea
                  sx={{ height: "100%" }}
                  onClick={() => {
                    handleCardSelect(item);
                  }}
                >
                  <CardHeader
                    title={item.name}
                    titleTypographyProps={{ fontSize: 24, fontWeight: 800 }}
                  />
                  <CardContent
                    sx={{ display: "flex", flexWrap: "wrap", rowGap: "10px" }}
                  >
                    {/* <Typography variant="h6" width={1}>
                      ₱{item.price}
                    </Typography> */}
                    {item.additionalOption[0].isChecked ? (
                      <Box
                        display="flex"
                        width={1}
                        justifyContent="space-between"
                      >
                        {Object.values(item.additionalOption).map((option) =>
                          option.isChecked ? (
                            <Box key={Object.values(option)}>
                              <Typography variant="body1" width={1}>
                                {option.field}
                              </Typography>
                              <Typography sx={{ fontWeight: "bold" }}>
                                ₱{option.value}
                              </Typography>
                            </Box>
                          ) : null
                        )}
                      </Box>
                    ) : (
                      <Typography variant="h6" width={1}>
                        ₱{item.price}
                      </Typography>
                    )}
                    <Typography variant="body2" width={0.5}>
                      Cost: ₱{item.cost}
                    </Typography>
                    <Typography variant="body2" textAlign={"right"} width={0.5}>
                      Stocks: {item.stocks}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </TabPanel>
        ))}
      </Paper>
    </Box>
  );
};

export default DisplayMenu;
