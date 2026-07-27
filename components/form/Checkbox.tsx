import cn from "classnames";

import Check from "@/public/images/ui/check.svg";

interface CheckboxProps {
  background?: "green" | "white";
  // formik: FormikValues;
  label: string | React.ReactNode;
  name: string;
  setter: (value: boolean) => void;
  getter: boolean;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  name,
  background = "green",
  setter,
  getter,
  className,
}) => {
  return (
    <div className="relative">
      <label className="relative flex items-center w-full gap-4 cursor-pointer group">
        <input
          type="checkbox"
          name={name}
          className="absolute opacity-0 pointer-events-none"
          onChange={() => setter(!getter)}
          required
          value={getter.toString()}
        />
        <div
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-sm border  transition-colors",
            {
              "text-white": background === "green",
              "text-green": background === "white",
              ["border-white/20 group-hover:border-white"]:
                !getter && background === "green",
              ["border-green/20 bg-white group-hover:border-green"]:
                !getter && background === "white",
              ["border-white"]: getter && background === "green",
              "border-green": getter && background === "white",
            }
          )}
        >
          <span
            className={cn("w-full transition-opacity", {
              ["opacity-0"]: !getter,
              ["opacity-100"]: getter,
            })}
          >
            <Check />
          </span>
        </div>
        <span
          className={cn("transition-opacity flex-1 group-hover:opacity-100", {
            "opacity-100": getter,
            "opacity-70": !getter,
          })}
        >
          {label}
        </span>
      </label>
    </div>
  );
};

export default Checkbox;
