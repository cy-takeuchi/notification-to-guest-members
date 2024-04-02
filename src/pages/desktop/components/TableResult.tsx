import DescriptionIcon from "@mui/icons-material/Description";
import GroupIcon from "@mui/icons-material/Group";
import {
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import { t } from "i18next";
import React from "react";

import { detailUrl } from "../functions/utils";

const TableCellHeader = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    textAlign: "center",
  },
}));

type TypeTableResult = {
  destinations: Destination[] | undefined | null;
};
const TableResult = (props: TypeTableResult) => {
  const { destinations } = props;

  if (destinations === undefined || destinations === null) return null;

  return (
    <TableContainer sx={{ maxHeight: "50vh" }}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCellHeader>
              {t("desktop:tableResult.header.app")}
            </TableCellHeader>
            <TableCellHeader>
              {t("desktop:tableResult.header.guestSpace")}
            </TableCellHeader>
            <TableCellHeader>
              {t("desktop:tableResult.header.result")}
            </TableCellHeader>
            <TableCellHeader>
              {t("desktop:tableResult.header.errorMessage")}
            </TableCellHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {destinations.map((destination) => (
            <TableRow
              key={destination.recordId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">
                <Link href={detailUrl(destination.recordId)} target="_blank">
                  <DescriptionIcon />
                </Link>
              </TableCell>
              <TableCell align="center">
                {destination.guestSpace && (
                  <Link href={destination.guestSpace} target="_blank">
                    <GroupIcon />
                  </Link>
                )}
              </TableCell>
              <TableCell align="center">
                {["SUCCESS"].includes(destination.result) && (
                  <Typography color="green">
                    {t("desktop:tableResult.body.success")}
                  </Typography>
                )}
                {["ERROR", "NA"].includes(destination.result) && (
                  <Typography color="red">
                    {t("desktop:tableResult.body.error")}
                  </Typography>
                )}
              </TableCell>
              <TableCell align="center">
                <Tooltip title={destination.errorMessage}>
                  <Typography
                    sx={{
                      display: "inline-block",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      width: "300px",
                      overflow: "hidden",
                    }}
                  >
                    {destination.errorMessage}
                  </Typography>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { TableResult };
