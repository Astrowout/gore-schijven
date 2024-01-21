interface IConditionalWrapperProps {
    condition: boolean;
    wrapper: (children: JSX.Element) => JSX.Element;
    children: JSX.Element;
}

export const ConditionalWrapper = ({
    condition,
    wrapper,
    children,
}: IConditionalWrapperProps) => {
    return condition ? wrapper(children) : children;
};