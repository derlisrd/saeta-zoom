interface IconProps {
  name: string;
  size?: number;
  color?: string;
}

function Icon({ name, size, color }: IconProps) {
  return <i className={`ti ti-${name}`} style={{ fontSize: size ?? 18, color: color }} />;
}

export default Icon;
