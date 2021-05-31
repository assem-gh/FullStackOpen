const Notification = ({ message }) => {
    switch (message.type) {
        case null:
            return null;
        case 'err':
            return (
                <div className="notification err">
                    {message.message}
                </div>)
        default:
            return (
                <div className="notification success">
                    {message.message}
                </div>
            )
    }
}
export default Notification