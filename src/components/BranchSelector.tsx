const branches = [
  "SHIMOGA",
  "SAGARA",
  "HOSANAGARA",
  "THIRTHAHALLI",
  "KOPPA",
  "SRINGERI",
  "BIRUR",
  "CHANNAGIRI",
  "BHADRAVATHI",
  "TARIKERE",
  "SHIKARIPURA",
  "SORABA BRANCH",
  "DP KOTE ROAD",
];

interface branchSelectorProps {
  selectedBranch: string;
  onBranchChange: (branch: string) => void;
}

const BranchSelector: React.FC<branchSelectorProps> = ({
  selectedBranch,
  onBranchChange,
}) => {
  return (
    <select
      value={selectedBranch}
      onChange={(e) => onBranchChange(e.target.value)}
      className="form-select mb-3"
    >
      {branches.map((branch) => (
        <option key={branch} value={branch}>
          {branch}
        </option>
      ))}
    </select>
  );
};

export default BranchSelector;
