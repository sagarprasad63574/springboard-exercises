const Tweet = ({username, name, date, message}) => {
    return (
        <div>
            <h1>Username: {username}</h1>
            <h3>Hello, my name is {name}</h3>
            <p>{date}</p>
            <p>{message}</p>
        </div>
    )
}