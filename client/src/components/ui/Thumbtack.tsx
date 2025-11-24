import Icon from "@app-ui/Icon"

// ＤＥＶ Ｎｏｔｅ： Parent must have position relative in order to work properly 
const Thumbtack = () => {
    return (
        <div className="absolute top-3 right-3 bg-dp-1 border border-accent-gray rounded-full z-10">
            <Icon className="icon-secondary-outline flex" id="pin" />
        </div>
    )
}

export default Thumbtack