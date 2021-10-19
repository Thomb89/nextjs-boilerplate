export type sGridProps = {
  className?: string;
};

export const Grid: React.FC<sGridProps> = ({ children, className }) => {
  return <div className={`grid ${className ?? ''}`}>{children}</div>;
};
