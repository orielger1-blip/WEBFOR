interface GoldenDashedRobotProps {
  variant?: 'resting' | 'standing';
  className?: string;
}

const GoldenDashedRobot = ({
  variant = 'resting',
  className = ''
}: GoldenDashedRobotProps) => {
  return (
    <div
      className={`golden-dashed-robot-wrapper ${variant} ${className}`}
      aria-hidden="true"
    >
      <svg
        width="80"
        height="80"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="golden-dashed-robot-svg"
      >
        {/* Body - dashed lines */}
        <rect
          x="7" y="10"
          width="10" height="8"
          rx="1"
          stroke="#14b8a6"
          strokeWidth="1"
          strokeDasharray="3 2"
        />

        {/* Head */}
        <path
          d="M9 10V7C9 5.89543 9.89543 5 11 5H13C14.1046 5 15 5.89543 15 7V10"
          stroke="#14b8a6"
          strokeWidth="1"
          strokeDasharray="2 1"
        />

        {/* Glowing eyes */}
        <circle cx="11" cy="7.5" r="0.5" fill="#14b8a6" className="robot-eye" />
        <circle cx="13" cy="7.5" r="0.5" fill="#14b8a6" className="robot-eye" />

        {/* Waving arm */}
        <path
          d="M17 12L20 10"
          stroke="#14b8a6"
          strokeWidth="1"
          strokeDasharray="2 1"
          className="robot-waving-arm"
        />

        {/* Legs */}
        <path
          d="M10 18V21M14 18V21"
          stroke="#14b8a6"
          strokeWidth="1"
          strokeDasharray="3 1"
        />
      </svg>
    </div>
  );
};

export default GoldenDashedRobot;
