import moment from "moment";

const millisecondsToHours = ms => {
  return Math.round((ms / 1000 / 60 / 60) * 100) / 100;
};

// tracks how many hours the driver has worked over the past 7 days
const getComplianceHoursToDate = (
  dailyFormattedLogs,
  currentIndex,
  currentHoursWorked
) => {
  let runningComplianceHours = 0;
  if (dailyFormattedLogs.length > 0) {
    if (currentIndex <= 6) {
      for (let i = 0; i < currentIndex; i++) {
        runningComplianceHours += dailyFormattedLogs[i].hoursWorked;
      }
    } else {
      for (let i = currentIndex - 6; i < currentIndex; i++) {
        runningComplianceHours += dailyFormattedLogs[i].hoursWorked;
      }
    }
  }
  return Math.round((runningComplianceHours + currentHoursWorked) * 100) / 100;
};

const calculatePay = hours => {
  if (hours > 40) {
    let regularPay = Math.round(40 * 22 * 100) / 100;
    let overtimePay = Math.round((hours - 40) * 33 * 100) / 100;
    return {
      regularPay: `$${regularPay}`,
      overtimePay: `$${overtimePay}`,
      weeklyGrossPay: `$${regularPay + overtimePay}`,
    };
  }
  let regularPay = `$${Math.round(hours * 22 * 100) / 100}`;
  return {
    regularPay,
    overtimePay: "$0",
    weeklyGrossPay: regularPay,
  };
};

const getFormattedLogs = sortedLogs => {
  return sortedLogs.reduce(
    (formattedLogs, log, index) => {
      const { daily, weekly } = formattedLogs;
      const { startTime, endTime, dutyStatusDurations } = log;
      const hoursWorked = dutyStatusDurations.onDutyDurationMs
        ? millisecondsToHours(dutyStatusDurations.onDutyDurationMs)
        : 0;
      const complianceHours = getComplianceHoursToDate(
        formattedLogs.daily,
        index,
        hoursWorked
      );
      const weekNumber = moment(startTime).week();
      if (!weekly[weekNumber]) {
        const currentDayPay = `$${Math.round(hoursWorked * 22 * 100) / 100}`;
        weekly[weekNumber] = {
          weekStart: moment(startTime).startOf("week").format("ll"),
          weekEnd: moment(startTime).endOf("week").format("ll"),
          hoursWorked,
          regularPay: currentDayPay,
          overtimePay: "$0",
          weeklyGrossPay: currentDayPay,
          id: weekNumber,
        };
      } else {
        const newHoursWorked = weekly[weekNumber].hoursWorked + hoursWorked;
        const { regularPay, overtimePay, weeklyGrossPay } =
          calculatePay(newHoursWorked);
        weekly[weekNumber] = {
          ...weekly[weekNumber],
          hoursWorked: newHoursWorked,
          regularPay,
          overtimePay,
          weeklyGrossPay,
        };
      }
      return {
        daily: [
          ...daily,
          {
            id: index,
            date: moment(startTime).format("ll"),
            hoursWorked,
            dailyGross: `$${Math.round(hoursWorked * 22 * 100) / 100}`,
            logStartTime: `${moment(startTime).format("lll")}`,
            logEndTime: moment(endTime).format("lll"),
            complianceHours:
              complianceHours < 56
                ? complianceHours
                : `${complianceHours} - WARNING (${
                    Math.round((100 / 70) * complianceHours * 100) / 100
                  }% of MAX)`,
          },
        ],
        weekly,
      };
    },
    { daily: [], weekly: {} }
  );
};

export { getFormattedLogs };
