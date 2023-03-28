const App = () => {
    return (
        <div>
            <Tweet username="john123" name="John" date={new Date().toDateString()} message="Hello world!"/>
            <Tweet username="smith123" name="Smith" date={new Date().toDateString()} message="Christmas"/>
            <Tweet username="ken123" name="Ken" date={new Date().toDateString()} message="Happy day!"/>
        </div>
    )
}