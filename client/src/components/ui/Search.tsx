import {
    Command,
    CommandInput
} from '@/components/ui/command'

const Search = () => {
    return (
        <Command className="outline-none border-none bg-transparent [&_div]:h-full **:border-none ">
            <CommandInput placeholder="Search..." className="border-none" />
        </Command>
    )
}

export default Search