import {
    Command,
    CommandInput
} from '@/components/ui/command'

const Search = () => {
    return (
        <Command className="
            outline-none border-none bg-transparent
            [&_div]:h-full **:border-none has-[input:focus]:bg-dp-1
        ">
            <CommandInput placeholder="Search..." className="border-none"/>
        </Command>
    )
}

export default Search