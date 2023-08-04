import { Changer } from "components/Languages/LanguageChange"

function BlankPage () {
    function handleHome() {
        window.location.assign("/")
    }
    return (
        <>
            <button onClick={handleHome}>
                <Changer inp="Home" />
            </button>
            <h4><Changer inp="You switched to a blank page (Testing button Function)" /></h4>
        </>
    )
}

export {BlankPage}