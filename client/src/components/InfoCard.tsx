import { Stack, Box, Typography } from "@mui/material";
import { FC } from "react";

type Props = {
  color: string;
  img: string;
  header: string;
  value: string;
};

const InfoCard: FC<Props> = ({ color, img, header, value }) => {
  return (
    <Stack
      direction="row"
      sx={{
        py: 4,
        px: 5,
        bgcolor: color,
        borderRadius: 1,
      }}
    >
      <Stack mr={4} justifyContent="center">
        <img style={{ height: "96px", width: "96px" }} src={img} alt="Book" />
      </Stack>
      <Stack justifyContent="center">
        <Box>
          <Typography color="gray" variant="h6">
            {header}
          </Typography>
          <Typography variant="h3">{value}</Typography>
        </Box>
      </Stack>
    </Stack>
  );
};

export default InfoCard;
