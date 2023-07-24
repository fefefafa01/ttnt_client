function BlankPage () {
    function handleHome() {
        window.location.assign("/")
    }
    return (
        <>
            <button onClick={handleHome}>
                Home
            </button>
            <h4>You switched to a blank page (Testing button Function)</h4>
        </>
    )
}

export {BlankPage}