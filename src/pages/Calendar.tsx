import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay, type PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Tooltip } from "@mui/material";
import { fetchCompany } from "../api";
import type { Project } from "../types";

function Calendar({ openSnackbar }: { openSnackbar?: unknown }) {
  const [projectDates, setProjectDates] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const data = await fetchCompany();

        const dates: Record<string, string[]> = {};

        data.projects?.forEach((project: Project) => {
          if (project.active !== false && project.startDate && project.endDate) {
            let current = dayjs(project.startDate);
            const end = dayjs(project.endDate);

            while (current.isBefore(end) || current.isSame(end, "day")) {
              const key = current.format("YYYY-MM-DD");
              if (!dates[key]) {
                dates[key] = [];
              }
              dates[key].push(project.name);
              current = current.add(1, "day");
            }
          }
        });

        setProjectDates(dates);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCompanyData();
  }, [openSnackbar]);

  interface ServerDayProps extends PickersDayProps {
    projectDates: Record<string, string[]>;
  }

  const ServerDay = (props: ServerDayProps) => {
    const { day, outsideCurrentMonth, projectDates, ...other } = props;

    const key = dayjs(day).format("YYYY-MM-DD");
    const projectsToday = projectDates[key] || [];
    const isHighlighted = projectsToday.length > 0;

    const dayElement = (
      <PickersDay
        {...other}
        day={day}
        outsideCurrentMonth={outsideCurrentMonth}
        sx={{
          ...(isHighlighted && {
            backgroundColor: "primary.main",
            color: "white",
            borderRadius: "50%",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }),
        }}
      />
    );

    return isHighlighted ? (
      <Tooltip title={projectsToday.join(", ")} arrow>
        {dayElement}
      </Tooltip>
    ) : (
      dayElement
    );
  };

  return (
    <>
      <h1>Calendar</h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          defaultValue={dayjs()}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          slots={{ day: ServerDay } as any}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          slotProps={{ day: { projectDates } as any }}
        />
      </LocalizationProvider>
    </>
  );
}

export default Calendar;
