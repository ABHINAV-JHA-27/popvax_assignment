import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DropDown = ({
  data = [],
  value,
  setValue,
  placeholder = "Select",
}: {
  data: string[];
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none ring-0 focus:ring-0 outline-none max-w-[250px]">
        <DropdownMenuLabel>
          <div className="text-gray-500 text-sm font-medium truncate border border-input bg-transparent rounded-md px-3 py-1">
            {value || placeholder}
          </div>
        </DropdownMenuLabel>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {data.map((item) => (
          <DropdownMenuItem
            key={item + "_dropdown_key"}
            onClick={() => setValue(item)}
          >
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;
