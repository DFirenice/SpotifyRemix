// Formats the string to acceptable url format
export const genSlug = (path: string) => (`${path.toLowerCase().split(' ').join("_")}`)