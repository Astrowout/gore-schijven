import ButtonRoot from "./Button.root";
import { ButtonProps } from "./Button.types";

export default function Button({
    children = null,
    ...props
}: ButtonProps) {
    return (
		<ButtonRoot {...props}>
            <span className="group inline-flex items-center justify-center text-neutral-600 hover:text-purple-500 shadow-xl h-14 px-6 rounded-full border-x border-neutral-600 hover:border-purple-500 bg-neutral-900 transition duration-300 hover:scale-x-110">
                <span className="transition-transform duration-300 group-hover:scale-x-90">
                    { children }
                </span>
            </span>
        </ButtonRoot>
    );
};
