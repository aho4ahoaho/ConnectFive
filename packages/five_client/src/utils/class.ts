export const concatClassNames = (...args: any[]) => {
    return args.filter(Boolean).join(' ');
};
