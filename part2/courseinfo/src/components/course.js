import Header from './header'
import Content from './content'


const Course = ({ name, parts }) => (
    <>
        <Header name={name} />
        <Content parts={parts} />

    </>
)

export default Course