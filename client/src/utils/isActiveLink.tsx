export const isActiveLink = (link: string, pathname: string) => {
    if (link.at(-1) === "*") {
        return pathname.startsWith(link.slice(0, -2))
    } else { return pathname === link }
}