interface DateNavigatorProps {
  currentDate: string;
  onDateChange: (direction: "prev" | "next") => void;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
}

const DateNavigator: React.FC<DateNavigatorProps> = ({
  currentDate,
  onDateChange,
  isPreviousDisabled,
  isNextDisabled,
}) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <button
        onClick={() => onDateChange("prev")}
        disabled={isPreviousDisabled}
        className="btn btn-outline-primary"
      >
        &lt;
      </button>
      <span className="h5 mb-0">{currentDate}</span>
      <button
        onClick={() => onDateChange("next")}
        disabled={isNextDisabled}
        className="btn btn-outline-primary"
      >
        &gt;
      </button>
    </div>
  );
};

export default DateNavigator;
