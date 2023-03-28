const Person = (props) => {
    let age = props.age;
    let name = props.name;
    let message = props.age >= 18 ? "please go vote!": "you must be 18!";

    if (name.length > 8) {
        name = name.slice(0, 6);
    }
    return (
        <div>
            <p>Learn some information about this person.</p>
            <h3>Name: {name}</h3>
            <h3>Age: {age}</h3>
            <h3>Message: {message}</h3>
            <ul>
                {props.hobbies.map(hobby => <li>{hobby}</li>)}
            </ul>
        </div>
    )
}